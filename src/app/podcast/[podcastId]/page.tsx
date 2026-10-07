import { PodcastDetailView } from "@/components";
import {
  loadPodcastDetail,
  loadPodcasts,
} from "@/lib/load-podcasts/load-podcasts";

export default async function PodcastPage({
  params,
}: {
  params: Promise<{ podcastId: string }>;
}) {
  const { podcastId } = await params;
  const [catalogResult, detailResult] = await Promise.allSettled([
    loadPodcasts(),
    loadPodcastDetail(podcastId),
  ]);

  return (
    <PodcastDetailView
      podcastId={podcastId}
      initialCatalog={
        catalogResult.status === "fulfilled" ? catalogResult.value : undefined
      }
      initialDetail={
        detailResult.status === "fulfilled" ? detailResult.value : undefined
      }
    />
  );
}
