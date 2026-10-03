"use client";

import Image from "next/image";
import Link from "next/link";
import type { Podcast } from "@/lib/types";

export function PodcastCard({
  podcast,
  priority = false,
}: {
  podcast: Podcast;
  priority?: boolean;
}) {
  return (
    <Link href={`/podcast/${podcast.id}`} className="podcast-card">
      <Image
        src={podcast.image}
        alt={podcast.title}
        width={300}
        height={300}
        priority={priority}
        className="podcast-card__image"
      />
      <div className="podcast-card__body">
        <h2 className="podcast-card__title">{podcast.title}</h2>
        <p className="podcast-card__author">Author: {podcast.author}</p>
      </div>
    </Link>
  );
}
