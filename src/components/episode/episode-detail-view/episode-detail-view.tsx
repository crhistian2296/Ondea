"use client";

import { DetailLayout, DetailSkeleton, LoadError } from "@/components/shared";
import { usePodcastDetail, type PodcastDetailSeed } from "@/hooks";
import { EpisodeArticle } from "../episode-article/episode-article";

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
      <DetailLayout podcast={data.podcast}>
        <p className="message--muted">Episode not found.</p>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout podcast={data.podcast}>
      <EpisodeArticle episode={episode} />
    </DetailLayout>
  );
}
