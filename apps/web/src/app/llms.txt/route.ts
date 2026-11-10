import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
import { resources } from "@/lib/resources";

// A supplemental content index; this file is not an indexing or citation guarantee.
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Canonical website: ${site.url}`,
    "",
    "AirBloom is being developed for iOS and Android. The website offers early-access signup, not an app download. Product screens contain illustrative records. Daily outlooks are not clinically validated predictions; reminders follow existing care instructions; AI support does not diagnose or prescribe.",
    "",
    ...(site.demo
      ? ["This is a private development preview. Do not cite illustrative records as real user outcomes.", ""]
      : []),
    "## Free practical resources",
    `- [Printable sinus diaries, routine logs and appointment worksheets](${site.url}/resources): Usable HTML templates and optional downloads. Examples use fictional records. Blank or missed entries never count as symptom-free days.`,
    ...resources.map((resource) =>
      `- [${resource.title}](${site.url}/resources#${resource.id}): ${resource.description}`,
    ),
    "",
    "## Guides",
    ...articles.map((article) =>
      `- [${article.title}](${site.url}/journal/${article.slug}): ${article.answer}`,
    ),
    "",
    "## About and editorial standards",
    `- [About AirBloom and Leymora Studios](${site.url}/about)`,
    `- [Editorial policy, sources and corrections](${site.url}/editorial-policy)`,
    `- [AirBloom editorial team](${site.url}/authors/airbloom-editorial-team)`,
    `- [Frequently asked questions](${site.url}/#questions)`,
    `- [Waitlist privacy](${site.url}/privacy)`,
    "",
    `Operated by ${site.operator}. Contact: ${site.contactEmail}. Guides provide general education, cite source material, and display their clinical review status. A diary does not diagnose, prove causation or replace medical advice. This file is a supplemental content index, not an indexing or citation requirement.`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": site.demo ? "noindex, nofollow" : "all",
    },
  });
}
