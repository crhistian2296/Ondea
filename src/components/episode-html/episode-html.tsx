"use client";

import { RichDescription } from "@/components";

export function EpisodeHtml({ html }: { html: string }) {
  return <RichDescription content={html} />;
}
