"use client";

import { DetailLayout, DetailSkeleton, LoadError } from "@/components/shared";
import { usePodcastDetail, type PodcastDetailSeed } from "@/hooks";
import { EpisodePanel } from "../episode-panel/episode-panel";

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
    <DetailLayout podcast={data.podcast}>
      <EpisodePanel episodes={data.episodes} podcastId={podcastId} />
    </DetailLayout>
  );
}
