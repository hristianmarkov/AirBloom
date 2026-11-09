/**
 * Bind this script to the user's Google Sheet, then deploy as a Web App.
 * Script Properties: WAITLIST_SECRET (random >=32 chars), optionally SHEET_ID.
 * Execute as: Me. Access: Anyone. The private shared secret protects writes.
 * Never put the secret in frontend code or a URL.
 */
const DEFAULT_SHEET_ID = '1H8JpqxDnDcwEtOUaJMsz3CNsqnLDEZNHk7__8VHA0wo';
const SIGNUP_HEADERS = ['Email', 'Platform', 'Signed up at (UTC)', 'Consent version', 'Request ID'];
const REMOVAL_HEADERS = ['Email', 'Requested at (UTC)', 'Request ID', 'Status'];

function doPost(e) {
  let locked = false;
  let stage = 'parse';
  let requestId = null;
  function reject(code) {
    console.error(JSON.stringify({ event: 'waitlist.receiver_failed', code, stage, requestId }));
    return reply_({ ok: false, code });
  }
  const lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || e.postData.contents.length > 4096) return reject('INVALID_REQUEST');
    const body = JSON.parse(e.postData.contents);
    const properties = PropertiesService.getScriptProperties();
    stage = 'authenticate';
    const secret = properties.getProperty('WAITLIST_SECRET');
    if (!secret || secret.length < 32) return reject('SECRET_NOT_CONFIGURED');
    if (body.secret !== secret) return reject('UNAUTHORIZED');
    stage = 'validate';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (email.length > 254 || !/^[a-z0-9.!#$%&'*+\/?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email) || /^[=+\-@]/.test(email)) return reject('INVALID_EMAIL');
    if (typeof body.requestId !== 'string' || !/^[a-zA-Z0-9-]{16,64}$/.test(body.requestId)) return reject('INVALID_REQUEST_ID');
    if (!['signup', 'removal-request'].includes(body.action)) return reject('INVALID_ACTION');
    if (body.action === 'signup' && (body.consent !== true || body.consentVersion !== 'beta-v1' || !['ios', 'android', 'both'].includes(body.platform))) return reject('INVALID_CONSENT');
    requestId = body.requestId;
    stage = 'lock';
    if (body.website) return reply_({ ok: true });
    locked = lock.tryLock(15000);
    if (!locked) return reject('LOCK_TIMEOUT');
    const cache = CacheService.getScriptCache();
    const hour = new Date().toISOString().slice(0, 13);
    const count = Number(cache.get(hour) || 0);
    if (count >= 240) return reject('RATE_LIMITED');
    cache.put(hour, String(count + 1), 3600);
    stage = 'open_spreadsheet';
    const book = SpreadsheetApp.openById(properties.getProperty('SHEET_ID') || DEFAULT_SHEET_ID);
    stage = 'write_row';
    if (body.action === 'removal-request') {
      const sheet = getSheet_(book, 'Removal requests', REMOVAL_HEADERS);
      const prior = findEmail_(sheet, email);
      if (!prior) sheet.appendRow([email, new Date().toISOString(), body.requestId, 'Pending administrator review']);
    } else {
      const sheet = getSheet_(book, 'Waitlist', SIGNUP_HEADERS);
      const prior = findEmail_(sheet, email);
      if (!prior) sheet.appendRow([email, body.platform, new Date().toISOString(), body.consentVersion, body.requestId]);
      else {
        // Preserve first consent/time, combine platform choices without duplicate records.
        const previousPlatform = sheet.getRange(prior.getRow(), 2).getValue();
        if (previousPlatform !== body.platform) sheet.getRange(prior.getRow(), 2).setValue('both');
      }
    }
    stage = 'flush';
    SpreadsheetApp.flush();
    console.info(JSON.stringify({ event: 'waitlist.receiver_saved', requestId }));
    return reply_({ ok: true });
  } catch (error) {
    // Log only fixed codes and stages; Google's exception may contain private data.
    return reject(error && error.message === 'HEADER_MISMATCH' ? 'HEADER_MISMATCH' : stage === 'parse' ? 'INVALID_REQUEST' : 'SHEET_OPERATION_FAILED');
  } finally {
    if (locked) lock.releaseLock();
  }
}

function getSheet_(book, name, headers) {
  const sheet = book.getSheetByName(name) || book.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers); sheet.setFrozenRows(1);
  } else {
    const existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (headers.some((h, i) => existing[i] !== h)) throw new Error('HEADER_MISMATCH');
  }
  return sheet;
}
function findEmail_(sheet, email) {
  if (sheet.getLastRow() < 2) return null;
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(email).matchEntireCell(true).matchCase(false).useRegularExpression(false).findNext();
}
function reply_(body) { return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON); }
