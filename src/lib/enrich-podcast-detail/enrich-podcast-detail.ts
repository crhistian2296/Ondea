import type { Podcast, PodcastDetail } from "@/lib";

export function enrichPodcastDetail(
  detail: PodcastDetail,
  catalog: Podcast[] | undefined,
): PodcastDetail {
  if (!catalog?.length) {
    return detail;
  }

  const match = catalog.find((item) => item.id === detail.podcast.id);
  if (!match) {
    return detail;
  }

  return {
    ...detail,
    podcast: {
      ...detail.podcast,
      title: detail.podcast.title || match.title,
      author: detail.podcast.author || match.author,
      authorUrl: detail.podcast.authorUrl || match.authorUrl,
      image: detail.podcast.image || match.image,
      genre: detail.podcast.genre || match.genre,
      description: detail.podcast.description || match.description,
    },
  };
}
