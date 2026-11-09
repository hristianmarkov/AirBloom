import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Run with a local dev or production server listening on port 3000.
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"],
});
try {
  const output = path.resolve("public/app-previews");
  await mkdir(output, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 3,
  });
  await page.goto("http://localhost:3000/demo/screens", {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  for (const variant of ["today", "history", "routine", "insights", "ask", "report"]) {
    await page
      .locator(`.phone-${variant}`)
      .screenshot({ path: path.join(output, `${variant}.png`) });
  }
  console.log("Saved six app concept screenshots to public/app-previews.");
} finally {
  await browser.close();
}
