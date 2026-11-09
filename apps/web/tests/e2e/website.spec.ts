import { expect, test } from "@playwright/test";
const publicMode = process.env.TEST_PUBLIC === "1";

test("homepage renders search-readable content, FAQ, and no horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Sinus Companion/);
  await expect(page.locator("h1")).toContainText("Know your patterns.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    publicMode ? /^index, follow$/ : /noindex/,
  );
  expect(await page.locator('script[type="application/ld+json"]').count()).toBe(
    2,
  );
  await page
    .getByText("Can Sinus Companion diagnose or treat sinusitis?", {
      exact: true,
    })
    .click();
  await expect(
    page.getByText("No. Sinus Companion is designed", { exact: false }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  if (publicMode) {
    await expect(page.getByText("12,000+ people")).toHaveCount(0);
    await expect(page.locator(".testimonials")).toHaveCount(0);
  }
});

for (const platform of ["ios", "android"] as const) {
  test(`${platform} store button opens beta dialog, submits selection, and restores focus`, async ({
    page,
  }) => {
    await page.goto("/");
    const button = page
      .getByRole("button", {
        name:
          platform === "ios"
            ? /App Store/
            : /Google Play/,
      })
      .first();
    await button.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByLabel("I’ll use it on")).toHaveValue(platform);
    await page.getByLabel("Email address").fill("tester@example.com");
    await page.getByRole("checkbox").check();
    const request = page.waitForRequest(
      (r) => r.url().endsWith("/api/waitlist") && r.method() === "POST",
    );
    await page.route("**/api/waitlist", (route) =>
      route.fulfill({ json: { ok: true } }),
    );
    await dialog.getByRole("button", { name: "Join the waitlist" }).click();
    const body = (await request).postDataJSON();
    expect(body.platform).toBe(platform);
    expect(body.consent).toBe(true);
    await expect(dialog.getByText("Here’s to clearer days.")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(button).toBeFocused();
  });
}
test("waitlist failure preserves entered email and never claims success", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Join the waitlist", exact: false })
    .first()
    .click();
  await page.getByLabel("Email address").fill("tester@example.com");
  await page.getByRole("checkbox").check();
  await page.route("**/api/waitlist", (route) =>
    route.fulfill({
      status: 502,
      json: { error: "The waitlist is unavailable. Please try again." },
    }),
  );
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Join the waitlist" })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "waitlist is unavailable",
  );
  await expect(page.getByLabel("Email address")).toHaveValue(
    "tester@example.com",
  );
  await expect(page.getByText("Here’s to clearer days.")).toHaveCount(0);
});
test("real API reports configuration; bad origins and invalid consent fail", async ({
  request,
}) => {
  const body = {
    email: "test@example.com",
    platform: "ios",
    consent: true,
    requestId: "12345678-1234-1234-1234-123456789012",
  };
  const result = await request.get("/api/waitlist");
  const health = await result.json();
  expect(result.status()).toBe(health.configured ? 200 : 503);
  expect(health.configured).toBe(health.missing.length === 0);
  expect(
    (
      await request.post("/api/waitlist", {
        data: body,
        headers: { origin: "https://untrusted.example" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/waitlist", {
        data: { ...body, consent: false },
        headers: { origin: "http://localhost:3000" },
      })
    ).status(),
  ).toBe(400);
});
test("both articles have an answer, source links, canonical, and Article schema", async ({
  page,
}) => {
  for (const slug of [
    "how-to-keep-a-sinus-symptom-diary",
    "prepare-for-your-ent-appointment",
  ]) {
    await page.goto(`/journal/${slug}`);
    await expect(page.locator("article")).toBeVisible();
    await expect(page.locator("#quick-answer")).toContainText(
      "THE SHORT ANSWER",
    );
    expect(await page.locator("#sources a").count()).toBe(3);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(slug),
    );
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schemas.some((s) => JSON.parse(s)["@type"] === "Article")).toBe(
      true,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("privacy removal records requests honestly and navigation works", async ({
  page,
}, testInfo) => {
  await page.goto("/privacy");
  await expect(
    page.getByText("Leymora Studios", { exact: false }).first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "hello@leymora.com", exact: true })
      .first(),
  ).toHaveAttribute("href", "mailto:hello@leymora.com");
  await page
    .getByLabel("The email address you signed up with")
    .fill("test@example.com");
  await page.route("**/api/waitlist", (route) =>
    route.fulfill({ json: { ok: true, demo: true } }),
  );
  await page
    .getByRole("button", { name: "Request removal from the waitlist" })
    .click();
  await expect(page.getByRole("status")).toContainText("no request was saved");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "The journal" })
      .click();
    await expect(page).toHaveURL(/\/journal$/);
  }
});

 test("product tour supports keyboard navigation and blog store buttons select a device", async ({ page }, testInfo) => {
 await page.goto("/");
 const tab = page.getByRole("tab", { name: /Your day/ });
 await tab.focus(); await page.keyboard.press("ArrowRight");
 await expect(page.getByRole("tab", { name: /Your history/ })).toHaveAttribute("aria-selected", "true");
 await expect(page.locator(".tour-panel .phone-history")).toBeVisible();
 await page.goto("/journal/prepare-for-your-ent-appointment");
 const sidebar = page.getByRole("complementary", { name: "Discover Sinus Companion" });
 await expect(sidebar).toBeVisible();
 if (testInfo.project.name === "desktop") {
 await page.locator(".article-body").scrollIntoViewIfNeeded();
 expect(await sidebar.evaluate(el => getComputedStyle(el).position)).toBe("sticky");
 }
 for (const [name, value] of [[/App Store/, "ios"], [/Google Play/, "android"]] as const) {
 await sidebar.getByRole("button", { name }).click();
 await expect(page.getByRole("dialog")).toBeVisible();
 await expect(page.getByLabel("I’ll use it on")).toHaveValue(value);
 await page.keyboard.press("Escape");
 }
 });
