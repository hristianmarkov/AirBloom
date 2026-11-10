"use client";

import type { AnalyticsEvent } from "./analytics-events";

let enabled = false;

export function configureEngagementTracking(value: boolean) {
  enabled = value;
}

export function trackEngagement(event: AnalyticsEvent) {
  if (!enabled || typeof window === "undefined") return;
  // A caller must never attach form data or other arbitrary event properties.
  if (Object.keys(event).some(key => !["event", "page_id", "asset_id"].includes(key))) return;
  if (/[?#]/.test(event.page_id)) return;
  const body = JSON.stringify(event);
  if (new TextEncoder().encode(body).byteLength > 512) return;
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "omit",
    referrerPolicy: "no-referrer",
  }).catch(() => { /* Measurement must not interrupt the reader's task. */ });
}
