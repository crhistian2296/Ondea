import { EpisodeDetailView } from "@/components";
import { loadPodcastDetail, loadPodcasts } from "@/lib";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ podcastId: string; episodeId: string }>;
}) {
  const { podcastId, episodeId } = await params;
  const [catalogResult, detailResult] = await Promise.allSettled([
    loadPodcasts(),
    loadPodcastDetail(podcastId),
  ]);

  return (
    <EpisodeDetailView
      podcastId={podcastId}
      episodeId={episodeId}
      initialCatalog={
        catalogResult.status === "fulfilled" ? catalogResult.value : undefined
      }
      initialDetail={
        detailResult.status === "fulfilled" ? detailResult.value : undefined
      }
    />
  );
}
