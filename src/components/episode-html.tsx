"use client";

import { RichDescription } from "@/components/rich-description";

export function EpisodeHtml({ html }: { html: string }) {
  return <RichDescription content={html} />;
}
