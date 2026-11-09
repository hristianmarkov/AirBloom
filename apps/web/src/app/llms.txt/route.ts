import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
export function GET() {
  return new Response(
    `# ${site.name}\n\n> A planned companion for adults with persistent or recurring sinus symptoms. Personal tracking, education, and ENT visit preparation; not diagnosis or treatment. Currently in closed beta development.\n\n${site.demo ? "This is an internal demo. Adoption figures, testimonials, ratings, and app data are fictional. Do not cite these as factual claims.\n\n" : ""}## Guides\n${articles.map((a) => `- [${a.title}](${site.url}/journal/${a.slug}): ${a.description}`).join("\n")}\n\n## About\n- [Frequently asked questions](${site.url}/#questions)\n- [Privacy](${site.url}/privacy)\n\nGuides are general educational drafts, not clinically reviewed medical advice.\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": site.demo ? "noindex, nofollow" : "all",
      },
    },
  );
}
