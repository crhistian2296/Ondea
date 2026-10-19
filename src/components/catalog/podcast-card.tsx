"use client";

import Image from "next/image";
import Link from "next/link";
import { PODCAST_CARD_IMAGE_SIZE, type Podcast } from "@/lib";

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
        width={PODCAST_CARD_IMAGE_SIZE}
        height={PODCAST_CARD_IMAGE_SIZE}
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
