import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function fixture() {
  const tabs = new Map<string, string[][]>();
  const sheet = (name: string) => ({
    getLastRow: () => tabs.get(name)!.length,
    appendRow: (row: string[]) => tabs.get(name)!.push(row),
    setFrozenRows: () => {},
    getRange: (row: number, col: number, rows = 1, cols = 1) => ({
      getValues: () =>
        tabs
          .get(name)!
          .slice(row - 1, row - 1 + rows)
          .map((r) => r.slice(col - 1, col - 1 + cols)),
      getValue: () => tabs.get(name)![row - 1][col - 1],
      setValue: (value: string) => {
        tabs.get(name)![row - 1][col - 1] = value;
      },
      createTextFinder: (email: string) => {
        const finder = {
          matchEntireCell: () => finder,
          matchCase: () => finder,
          useRegularExpression: () => finder,
          findNext: () => {
            const i = tabs
              .get(name)!
              .findIndex((r, i) => i >= row - 1 && r[0] === email);
            return i < 0 ? null : { getRow: () => i + 1 };
          },
        };
        return finder;
      },
    }),
  });
  let released = 0;
  const context = vm.createContext({
    LockService: {
      getScriptLock: () => ({
        tryLock: () => true,
        releaseLock: () => released++,
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (key: string) =>
          key === "WAITLIST_SECRET" ? "x".repeat(32) : null,
      }),
    },
    CacheService: {
      getScriptCache: () => ({ get: () => null, put: () => {} }),
    },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName: (name: string) => (tabs.has(name) ? sheet(name) : null),
        insertSheet: (name: string) => {
          tabs.set(name, []);
          return sheet(name);
        },
      }),
      flush: () => {},
    },
    ContentService: {
      MimeType: { JSON: "application/json" },
      createTextOutput: (s: string) => ({ setMimeType: () => JSON.parse(s) }),
    },
  });
  vm.runInContext(
    readFileSync("../../infrastructure/google-sheets/Code.gs", "utf8"),
    context,
  );
  const send = (overrides = {}) =>
    context.doPost({
      postData: {
        contents: JSON.stringify({
          email: "jamie@example.com",
          platform: "ios",
          consent: true,
          consentVersion: "beta-v1",
          requestId: "12345678-1234-1234-1234-123456789012",
          action: "signup",
          secret: "x".repeat(32),
          ...overrides,
        }),
      },
    });
  return { tabs, send, released: () => released };
}
test("Sheet receiver appends once, merges device preference, preserves consent, and releases locks", () => {
  const f = fixture();
  assert.equal(f.send().ok, true);
  assert.equal(f.send().ok, true);
  assert.equal(f.send({ platform: "android" }).ok, true);
  assert.equal(f.tabs.get("Waitlist")!.length, 2);
  assert.equal(f.tabs.get("Waitlist")![1][1], "both");
  assert.equal(f.tabs.get("Waitlist")![1][3], "beta-v1");
  assert.equal(f.released(), 3);
});
test("Sheet receiver rejects unauthenticated/invalid submissions without creating a sheet", () => {
  const f = fixture();
  assert.equal(f.send({ secret: "invalid" }).ok, false);
  assert.equal(f.send({ consent: false }).ok, false);
  assert.equal(f.send({ email: "=formula@example.com" }).ok, false);
  assert.equal(f.tabs.size, 0);
});
test("removal requests go into a separate tab, once, without deleting signup evidence", () => {
  const f = fixture();
  f.send();
  f.send({ action: "removal-request", consent: false });
  f.send({ action: "removal-request", consent: false });
  assert.equal(f.tabs.get("Waitlist")!.length, 2);
  assert.equal(f.tabs.get("Removal requests")!.length, 2);
  assert.equal(
    f.tabs.get("Removal requests")![1][3],
    "Pending administrator review",
  );
});
