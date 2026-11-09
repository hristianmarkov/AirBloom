import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

// A supplemental content index; this file is not an indexing or citation guarantee.
export function GET() {
  return new Response(
    `# ${site.name}\n\n> ${site.description}\n\nAirBloom is being developed for iOS and Android. The website offers early-access signup, not an app download. Product screens contain illustrative records. Daily outlooks are not clinically validated predictions; reminders follow existing care instructions; AI support does not diagnose or prescribe.\n\n${site.demo ? "This is a private development preview. Do not cite illustrative records as real user outcomes.\n\n" : ""}## Guides\n${articles.map((a) => `- [${a.title}](${site.url}/journal/${a.slug}): ${a.answer}`).join("\n")}\n\n## About\n- [Frequently asked questions](${site.url}/#questions)\n- [Waitlist privacy](${site.url}/privacy)\n\nOperated by ${site.operator}. Contact: ${site.contactEmail}. Guides provide general education, cite source material, and have not been clinically reviewed.\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": site.demo ? "noindex, nofollow" : "all",
      },
    },
  );
}
