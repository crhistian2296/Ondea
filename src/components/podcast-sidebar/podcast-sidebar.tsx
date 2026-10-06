"use client";

import Image from "next/image";
import Link from "next/link";
import { RichDescription } from "@/components";
import { PODCAST_SIDEBAR_IMAGE_SIZE, type Podcast } from "@/lib";

export function PodcastSidebar({ podcast }: { podcast: Podcast }) {
  const href = `/podcast/${podcast.id}`;

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <Link href={href} className="sidebar__image-link">
          <Image
            src={podcast.image}
            alt={podcast.title}
            width={PODCAST_SIDEBAR_IMAGE_SIZE}
            height={PODCAST_SIDEBAR_IMAGE_SIZE}
            className="sidebar__image"
            priority
          />
        </Link>
        <div className="sidebar__info">
          <Link href={href} className="sidebar__title">
            {podcast.title}
          </Link>
          <Link href={href} className="sidebar__author">
            by {podcast.author}
          </Link>
          <div className="sidebar__description-block sidebar__description-block--desktop">
            <p className="sidebar__label">Description:</p>
            <RichDescription content={podcast.description} />
          </div>
        </div>
      </div>
      <div className="sidebar__description-block sidebar__description-block--mobile">
        <p className="sidebar__label">Description:</p>
        <RichDescription content={podcast.description} />
      </div>
    </aside>
  );
}
