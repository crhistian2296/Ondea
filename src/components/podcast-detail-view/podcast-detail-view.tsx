"use client";

import Link from "next/link";
import { LoadError, PodcastSidebar } from "@/components";
import { usePodcastDetail, type PodcastDetailSeed } from "@/hooks";
import { formatDate, formatDuration, type Episode } from "@/lib";

function DetailSkeleton() {
  return (
    <div className="container detail-skeleton">
      <div className="skeleton detail-skeleton__sidebar" />
      <div className="skeleton detail-skeleton__main" />
    </div>
  );
}

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

export function PodcastDetailView({
  podcastId,
  initialCatalog,
  initialDetail,
}: {
  podcastId: string;
} & PodcastDetailSeed) {
  const { data, isPending, isError, refetch } = usePodcastDetail(podcastId, {
    initialCatalog,
    initialDetail,
  });

  if (isError && !data) {
    return (
      <section className="container">
        <LoadError
          message="No se pudo cargar el podcast."
          onRetry={() => void refetch()}
        />
      </section>
    );
  }

  if (isPending || !data) {
    return <DetailSkeleton />;
  }

  return (
    <section className="container detail-layout">
      <PodcastSidebar podcast={data.podcast} />
      <div className="detail-layout__main">
        <div className="episode-panel">
          <div className="episode-panel__header">
            Episodes: {data.episodes.length}
          </div>
          <EpisodeMobileList episodes={data.episodes} podcastId={podcastId} />
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
                {data.episodes.map((episode) => (
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
    </section>
  );
}
