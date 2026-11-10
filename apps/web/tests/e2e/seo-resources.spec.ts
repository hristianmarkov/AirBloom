import { expect, test, type APIRequestContext } from "@playwright/test";
import { articles } from "../../src/lib/articles";
import { resources } from "../../src/lib/resources";

const publicMode = process.env.TEST_PUBLIC === "1";
const origin = "https://www.airbloom.app";
const trustPaths = ["", "/journal", "/resources", "/about", "/editorial-policy", "/authors/airbloom-editorial-team", "/privacy"];

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function decodeHtml(value: string) {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
}
function values(html: string, tag: string, attribute: string) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].flatMap(([element]) => {
    const value = element.match(new RegExp(`\\b${attribute}="([^"]*)"`))?.[1];
    return value === undefined ? [] : [decodeHtml(value)];
  });
}
function canonicalLinks(html: string) {
  return [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).filter((tag) => /\brel="canonical"/.test(tag)).map((tag) => decodeHtml(tag.match(/\bhref="([^"]+)"/)?.[1] ?? ""));
}
async function getHtml(request: APIRequestContext, path: string) {
  const response = await request.get(path || "/");
  expect(response.status(), `GET ${path || "/"}`).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/html");
  return response.text();
}

test("every guide ships its answer, article data and canonical in initial HTML", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Request matrix runs once; responsive flows run in both projects.");
  for (const article of articles) {
    await test.step(article.slug, async () => {
      const html = await getHtml(request, `/journal/${article.slug}`);
      expect(html).toContain(`<h1>${escapeHtml(article.title)}</h1>`);
      expect(html).toContain(escapeHtml(article.answer));
      expect(html).toContain('id="quick-answer"');
      const canonicals = canonicalLinks(html);
      expect(canonicals).toHaveLength(1);
      if (publicMode) expect(canonicals[0]).toBe(`${origin}/journal/${article.slug}`);
      else expect(canonicals[0].endsWith(`/journal/${article.slug}`)).toBe(true);
      const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const schema = schemas.find((item) => item["@type"] === "Article");
      expect(schema, `${article.slug} Article schema`).toBeTruthy();
      expect(schema.headline).toBe(article.title);
      expect(schema.datePublished).toBe(article.publishedAt);
      expect(schema.dateModified).toBe(article.modifiedAt);
      expect(schema.citation).toEqual(article.sources.map((source) => source.url));
      expect(schema.author.url.endsWith("/authors/airbloom-editorial-team")).toBe(true);
      expect(schema).not.toHaveProperty("reviewedBy");
      expect(html).toContain('name="twitter:description"');
      expect(html).toContain(`content="${escapeHtml(article.description)}"`);
      if (publicMode) expect(html).not.toContain('content="noindex');
    });
  }
});

test("sitemap, hub and every internal journal/resource fragment resolve", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Request matrix runs once.");
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeHtml(match[1]));
  if (publicMode) {
    const expected = [...trustPaths.map((path) => `${origin}${path}`), ...articles.map((article) => `${origin}/journal/${article.slug}`)];
    expect(new Set(listed)).toEqual(new Set(expected));
    expect(listed).toHaveLength(expected.length);
    expect(sitemap).not.toContain("findease");
    expect(sitemap).not.toContain("/downloads/");
    expect(sitemap).not.toContain("/demo/");
  } else expect(listed).toEqual([]);

  const documents = new Map<string, string>();
  for (const path of ["/journal", "/resources", ...articles.map((article) => `/journal/${article.slug}`)]) {
    documents.set(path, await getHtml(request, path));
  }
  const hubLinks = values(documents.get("/journal")!, "a", "href");
  for (const article of articles) expect(hubLinks).toContain(`/journal/${article.slug}`);
  for (const [path, html] of documents) {
    for (const href of values(html, "a", "href")) {
      const target = new URL(href, `${origin}${path}`);
      if (target.origin !== origin || !(target.pathname === "/resources" || target.pathname === "/journal" || target.pathname.startsWith("/journal/"))) continue;
      expect(documents.has(target.pathname), `${path} links to missing ${target.pathname}`).toBe(true);
      if (target.hash) {
        const ids = values(documents.get(target.pathname)!, "[a-zA-Z][a-zA-Z0-9-]*", "id");
        expect(ids, `${path} -> ${target.pathname}${target.hash}`).toContain(decodeURIComponent(target.hash.slice(1)));
      }
    }
  }
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  const index = await llms.text();
  for (const article of articles) expect(index).toContain(`/journal/${article.slug}`);
  expect(index).toContain("/resources");
});

test("all advertised downloads have real files and noindex copies", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Asset matrix runs once.");
  const paths = [...new Set(resources.flatMap((resource) => [resource.pdf, resource.editable, resource.spreadsheet, resource.csv].filter((path): path is string => Boolean(path))))];
  for (const path of paths) {
    await test.step(path, async () => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      expect(response.headers()["x-robots-tag"]).toContain("noindex");
      const body = await response.body();
      expect(body.length).toBeGreaterThan(path.endsWith(".csv") ? 100 : 1000);
      if (path.endsWith(".pdf")) {
        expect(response.headers()["content-type"]).toContain("application/pdf");
        expect(body.subarray(0, 5).toString()).toBe("%PDF-");
      } else if (path.endsWith(".xlsx")) {
        expect(body.subarray(0, 2).toString()).toBe("PK");
      } else if (path.endsWith(".html")) {
        const html = body.toString();
        expect(html).toContain('contenteditable="true"');
        expect(html).toContain('content="noindex,follow"');
        expect(html).toContain("Print / Save as PDF");
        expect(html).not.toMatch(/localStorage|sessionStorage|indexedDB|<form\b/);
      }
    });
  }
});

test("readers can search, filter, reset and reach resources without page overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/journal");
  const cards = page.locator(".journal-browser .article-card");
  await expect(cards).toHaveCount(articles.length);
  await page.getByLabel("Search the guides").fill("zz-no-matching-guide-zz");
  await expect(cards).toHaveCount(0);
  await expect(page.getByText("No guides match those words yet.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(cards).toHaveCount(articles.length);
  const topic = articles[0].topic;
  await page.getByLabel("Browse by topic").selectOption(topic);
  await expect(cards).toHaveCount(articles.filter((article) => article.topic === topic).length);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Search the guides").fill("summary");
  await expect(cards).not.toHaveCount(0);
  await expect(page.getByRole("link", { name: /Something useful to take away/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: /Something useful to take away/ }).click();
  await expect(page).toHaveURL(/\/resources$/);
  await expect(page.locator("main section#sinus-symptom-diary")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/journal/sinus-symptom-summary-for-doctor");
  await expect(page.locator("#downloads")).toContainText("One-page sinus summary");
  await expect(page.locator(".journal-table-scroll table").first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("worksheet edits remain in the tab and print sends only allowlisted identifiers", async ({ page }) => {
  const marker = "Private test note: waking pressure 4 of 10";
  await page.goto("/downloads/sinus-symptom-diary.html");
  await expect(page.getByText("Nothing you type is uploaded or saved.", { exact: false })).toBeVisible();
  const posts: { url: string; body: string | null }[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") posts.push({ url: request.url(), body: request.postData() });
  });
  const cell = page.locator("tbody td[contenteditable=true]").first();
  await cell.fill(marker);
  await expect(cell).toHaveText(marker);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  expect(posts).toEqual([]);
  await page.evaluate(() => {
    (window as Window & { printCalls?: number }).printCalls = 0;
    window.print = () => { const state = window as Window & { printCalls?: number }; state.printCalls = (state.printCalls || 0) + 1; };
  });
  const event = page.waitForRequest((request) => request.url().endsWith("/api/events") && request.method() === "POST");
  await page.getByRole("button", { name: "Print / Save as PDF" }).click();
  const printRequest = await event;
  expect(printRequest.postDataJSON()).toEqual({ event: "print_template", page_id: "/downloads/sinus-symptom-diary.html", asset_id: "sinus-symptom-diary" });
  expect(await page.evaluate(() => (window as Window & { printCalls?: number }).printCalls)).toBe(1);
  for (const post of posts) {
    expect(post.url).toMatch(/\/api\/events$/);
    expect(post.body).not.toContain(marker);
    expect(Object.keys(JSON.parse(post.body || "{}" )).sort()).toEqual(["asset_id", "event", "page_id"]);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await expect(cell).toHaveText("Day 1");
});

test("unknown articles return 404 and concept screens remain noindex", async ({ request }) => {
  const unknown = await request.get("/journal/this-guide-does-not-exist");
  expect(unknown.status()).toBe(404);
  const unknownHtml = await unknown.text();
  expect(unknownHtml).toContain("noindex");
  expect(unknownHtml).not.toMatch(/name="(?:robots|googlebot)" content="index/);
  const demo = await request.get("/demo/screens");
  expect(demo.status()).toBe(200);
  expect(await demo.text()).toMatch(/name="robots" content="noindex/);
});
