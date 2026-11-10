"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { configureEngagementTracking, trackEngagement } from "@/lib/analytics";

type ResourceLinks = {
  id: string;
  pdf?: string;
  editable?: string;
  spreadsheet?: string;
  csv?: string;
};

export function EngagementTracker({
  enabled,
  articlePaths,
  resources,
}: {
  enabled: boolean;
  articlePaths: string[];
  resources: ResourceLinks[];
}) {
  const pathname = usePathname();
  useEffect(() => {
    configureEngagementTracking(enabled);
    return () => configureEngagementTracking(false);
  }, [enabled]);
  useEffect(() => {
    if (!enabled || !articlePaths.includes(pathname)) return;
    trackEngagement({ event: "article_view", page_id: pathname });
  }, [enabled, pathname, articlePaths]);
  useEffect(() => {
    if (!enabled) return;
    const assets = new Map<string, { id: string; editable: boolean }>();
    for (const resource of resources) {
      for (const path of [resource.pdf, resource.editable, resource.spreadsheet, resource.csv]) {
        if (path) assets.set(path, { id: resource.id, editable: path === resource.editable });
      }
    }
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const target = new URL(anchor.href, window.location.origin);
      if (target.origin !== window.location.origin) return;
      const asset = assets.get(target.pathname);
      if (asset) {
        trackEngagement({
          event: asset.editable ? "worksheet_open" : "template_download",
          page_id: pathname,
          asset_id: asset.id,
        });
      } else if (
        anchor.closest(".related-reading, [data-resource-next]") &&
        (target.pathname === "/resources" || articlePaths.includes(target.pathname))
      ) {
        trackEngagement({ event: "resource_next_click", page_id: pathname });
      }
    }
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, [enabled, pathname, articlePaths, resources]);
  return null;
}
