"use client";

import Link from "next/link";
import { formatDate, formatDuration, type Episode } from "@/lib";

function EpisodeMobileList({
  episodes,
  podcastId,
}: {
  episodes: Episode[];
  podcastId: string;
}) {
  return (
    <ul className="episode-list episode-list--mobile">
      {episodes.map((episode) => (
        <li key={episode.id} className="episode-list__item">
          <Link
            href={`/podcast/${podcastId}/episode/${episode.id}`}
            className="episode-list__link"
          >
            {episode.title}
          </Link>
          <div className="episode-list__meta">
            <span>{formatDate(episode.releaseDate)}</span>
            <span>{formatDuration(episode.durationMs)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EpisodePanel({
  episodes,
  podcastId,
}: {
  episodes: Episode[];
  podcastId: string;
}) {
  return (
    <div className="detail-layout__main">
      <div className="episode-panel">
        <div className="episode-panel__header">
          Episodes: {episodes.length}
        </div>
        <EpisodeMobileList episodes={episodes} podcastId={podcastId} />
        <div className="episode-table-wrap">
          <table className="episode-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr key={episode.id}>
                  <td>
                    <Link
                      href={`/podcast/${podcastId}/episode/${episode.id}`}
                      className="episode-table__link"
                    >
                      {episode.title}
                    </Link>
                  </td>
                  <td className="episode-table__muted">
                    {formatDate(episode.releaseDate)}
                  </td>
                  <td className="episode-table__muted">
                    {formatDuration(episode.durationMs)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
