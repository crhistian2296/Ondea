"use client";

import type { ReactNode } from "react";
import { PodcastSidebar } from "../../podcast/podcast-sidebar/podcast-sidebar";
import type { Podcast } from "@/lib";

export function DetailLayout({
  podcast,
  children,
}: {
  podcast: Podcast;
  children: ReactNode;
}) {
  return (
    <section className="container detail-layout">
      <PodcastSidebar podcast={podcast} />
      {children}
    </section>
  );
}
