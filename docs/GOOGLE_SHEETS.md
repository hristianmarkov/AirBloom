# Connect the beta waitlist to your Google Sheet

This setup uses a Sheet-bound Google Apps Script. The website calls it only from the server; the secret and deployment URL are never exposed in browser code.

## 1. Add the receiver

1. Open [your empty waitlist Sheet](https://docs.google.com/spreadsheets/d/1H8JpqxDnDcwEtOUaJMsz3CNsqnLDEZNHk7__8VHA0wo/edit).
2. Select **Extensions → Apps Script**. Replace the starter `Code.gs` with `infrastructure/google-sheets/Code.gs` from this repository.
3. In Project Settings, enable the `appsscript.json` manifest and replace it with `infrastructure/google-sheets/appsscript.json`.
4. In Project Settings → Script properties, add `WAITLIST_SECRET` with a random secret of at least 32 characters. Generate it with a password manager and save it securely. Use the same value in the website's server environment, never in chat or Git.
5. The code already targets your Sheet ID. If you later use a different Sheet, set a `SHEET_ID` script property instead of modifying code.

The receiver creates a **Waitlist** tab and **Removal requests** tab when needed. It preserves an existing tab and refuses to write if its headers do not match. It does not alter the original empty Sheet1 tab.

## 2. Deploy

1. Choose **Deploy → New deployment → Web app**.
2. Execute as **Me** (the authorized Sheet owner).
3. Who has access: **Anyone**. The receiver validates the private shared secret before any write. Do not use the frontend to call this URL.
4. Authorize access to the spreadsheet and deploy. Use Google's normal authorization flow; don't bypass warnings for an unknown app or a script you haven't reviewed.
5. Copy the deployment URL ending in `/exec`, not the editor or `/dev` URL.

Workspace organizations can restrict anonymous Apps Script deployments. If that policy prevents deployment, use an approved server-to-server Google Sheets service account integration instead; do not relax organizational policy to make this sample work.

## 3. Configure the website

In `apps/web/.env.local` for local work, or Vercel's Environment Variables for the deployed project, add:

```dotenv
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=YOUR_SECRET_FROM_SCRIPT_PROPERTIES
```

For Vercel, enable both variables in the intended Preview/Production environments and redeploy. They must **not** use a `NEXT_PUBLIC_` prefix.

Keep the Sheet restricted to the owner and necessary administrators. Do not enable public link sharing for waitlist rows. Server egress needs `script.google.com` and its response redirect host `script.googleusercontent.com`. The current cloud environment's custom allowlist will need those two additions for a live local write. Actual Vercel outbound networking is configured separately.

## 4. Verify the real integration

1. Restart the local server or redeploy after setting the variables.
2. Use an email address you control. Click an App Store button, consent, and submit.
3. Confirm the dialog shows the real confirmation, and the Sheet has a new row with the email, `ios`, UTC time, `beta-v1`, and request ID.
4. Submit that address again via Google Play. There should still be one row; its platform should be `both`.
5. On `/privacy`, send a removal request. Confirm one entry in **Removal requests**. This is a request queue, not automatic deletion or an identity-verification service.
6. Remove test data when finished. Confirm a failed receiver never shows a saved confirmation.

For script updates, deploy a **new version** to the existing deployment so `/exec` serves the latest code. Updating the editor alone doesn't update the deployed version.

## Operations

- The receiver uses a script lock and case-insensitive email matching to avoid duplicate signups across concurrent requests. Retries after a lost response are safe.
- It caps accepted receiver requests to approximately 240/hour, with Google's cache semantics. The Next.js limiter is per-process and best-effort. For a public, high-traffic campaign, configure Vercel Firewall rate limits or a durable limiter and an accessible bot challenge.
- No email delivery provider is configured. Saving an address does not send a confirmation or beta invitation.
- Monitor **Removal requests**. Verify requests where necessary, remove the matching signup, mark the request completed, and do not retain personal data longer than the published policy.
- Rotate a leaked secret in Script Properties and the website environment together. No secrets are included in source code or screenshots.

## Validation boundary

Local tests execute the actual receiver code in a mocked Apps Script environment. They cover authentication, invalid consent, duplicate signup, platform merging, and removal requests. A real Google write was not performed: the available Google credential file contains no usable configuration, Google API access is blocked by the current cloud network policy, and the Google plugin is not callable in this session.
