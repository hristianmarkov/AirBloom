import { receiveAnalyticsEvent } from "@/lib/analytics-events";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return receiveAnalyticsEvent(request, { enabled: !site.demo });
}
