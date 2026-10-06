"use client";

import { EpisodeHtml, LoadError, PodcastSidebar } from "@/components";
import { usePodcastDetail, type PodcastDetailSeed } from "@/hooks";

function DetailSkeleton() {
  return (
    <div className="container detail-skeleton">
      <div className="skeleton detail-skeleton__sidebar" />
      <div className="skeleton detail-skeleton__main" />
    </div>
  );
}

export function EpisodeDetailView({
  podcastId,
  episodeId,
  initialCatalog,
  initialDetail,
}: {
  podcastId: string;
  episodeId: string;
} & PodcastDetailSeed) {
  const { data, isPending, isError, refetch } = usePodcastDetail(podcastId, {
    initialCatalog,
    initialDetail,
  });

  if (isError && !data) {
    return (
      <section className="container">
        <LoadError
          message="No se pudo cargar el episodio."
          onRetry={() => void refetch()}
        />
      </section>
    );
  }

  if (isPending || !data) {
    return <DetailSkeleton />;
  }

  const episode = data.episodes.find((item) => item.id === episodeId);

  if (!episode) {
    return (
      <section className="container detail-layout">
        <PodcastSidebar podcast={data.podcast} />
        <p className="message--muted">Episode not found.</p>
      </section>
    );
  }

  return (
    <section className="container detail-layout">
      <PodcastSidebar podcast={data.podcast} />
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
    </section>
  );
}
