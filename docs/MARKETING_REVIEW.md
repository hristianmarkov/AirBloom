# Marketing improvements — November 9, 2026

The original site had a cohesive palette and visual direction but did not explain its practical value quickly enough. The thin italic display face reduced readability, and blog readers had no persistent route into the product.

## Implemented

- Replaced Instrument Serif with DM Sans throughout, removed thin italic heading treatment, increased article text and body contrast.
- Led with symptom history, personal patterns, and visit preparation. Added a direct closed-beta CTA above the store buttons.
- Added a keyboard-accessible five-screen product tour: Today, History, Insights, Ask, and ENT Visit Pack. Added calendar and AI conversation concept screens and five full-resolution PNG captures under `/app-previews/`.
- Added a sticky article sidebar featuring the app, three benefits, and both store buttons. On mobile it flows below the article. Buttons preselect iOS or Android in the existing dialog.
- Removed fictional ratings, usage counts, and testimonials from all site modes.
- Reviewed both educational articles. Kept their source links and separated educational content from individual medical advice.
- Prepared the requested Google Sheet's original gid 0 as Waitlist with the receiver's five required headers. Existing access permissions are unchanged.

## Launch boundary

This is a prelaunch marketing website, not evidence of a released mobile app. Concepts use fictional records. No clinical effectiveness, validated forecast percentages, customer endorsements, or App Store availability is claimed.

The Google Apps Script receiver still needs owner-authorized deployment and the two server-only Vercel environment variables described in `GOOGLE_SHEETS.md`. Until that happens, production signup submissions return an error and do not show a saved confirmation. Do not start paid acquisition until a real signup has been verified in the Sheet.

## Verification

Production build and TypeScript passed. Twelve unit tests passed. Sixteen desktop/mobile browser tests passed, including device selection, popup focus return, error handling, article layout, and tour keyboard navigation. Browser screenshots were inspected on desktop and mobile; five app concept screenshots were captured at 3× resolution. Signup success rendering is tested with a mocked response; it is not evidence of a live Google write.
