"use client";

import { RichDescription } from "@/components/shared";

export function EpisodeHtml({ html }: { html: string }) {
  return <RichDescription content={html} />;
}
