"use client";

import type { Episode } from "@/lib";
import { EpisodeHtml } from "../episode-html/episode-html";

export function EpisodeArticle({ episode }: { episode: Episode }) {
  return (
    <article className="episode-detail">
      <h1 className="episode-detail__title">{episode.title}</h1>
      <div className="episode-detail__body">
        <EpisodeHtml html={episode.description} />
      </div>
      {episode.audioUrl ? (
        <audio
          className="episode-detail__audio"
          controls
          src={episode.audioUrl}
        />
      ) : null}
    </article>
  );
}
