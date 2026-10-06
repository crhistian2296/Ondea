import type {
  Episode,
  ItunesLookupResponse,
  ItunesRssFeed,
  Podcast,
  PodcastDetail,
} from "@/lib";

const fixtureArtwork =
  "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/e2/placeholder/art.jpg";

export const fixturePodcast: Podcast = {
  id: "1001",
  title: "Fixture Show",
  author: "Fixture Author",
  authorUrl: "https://example.com/author",
  image: fixtureArtwork,
  description: "Fixture podcast description",
  genre: "Music Commentary",
};

export const fixturePodcastTwo: Podcast = {
  id: "1002",
  title: "Another Show",
  author: "NPR Team",
  image: fixtureArtwork,
  description: "Second podcast",
  genre: "Music",
};

export const fixtureEpisode: Episode = {
  id: "9001",
  podcastId: fixturePodcast.id,
  title: "Fixture Episode",
  description: "<p>Episode body</p>",
  releaseDate: "2016-03-01T00:00:00Z",
  durationMs: 900_000,
  audioUrl: "https://example.com/episode.mp3",
};

export const fixturePodcastDetail: PodcastDetail = {
  podcast: fixturePodcast,
  episodes: [fixtureEpisode],
};

export const fixtureRssFeed: ItunesRssFeed = {
  feed: {
    entry: [
      {
        id: { attributes: { "im:id": fixturePodcast.id } },
        "im:name": { label: fixturePodcast.title },
        "im:artist": {
          label: fixturePodcast.author,
          attributes: { href: fixturePodcast.authorUrl },
        },
        "im:image": [{ label: fixturePodcast.image }],
        summary: { label: fixturePodcast.description },
        category: { attributes: { label: fixturePodcast.genre } },
      },
      {
        id: { attributes: { "im:id": fixturePodcastTwo.id } },
        "im:name": { label: fixturePodcastTwo.title },
        "im:artist": { label: fixturePodcastTwo.author },
        "im:image": [{ label: fixturePodcastTwo.image }],
        summary: { label: fixturePodcastTwo.description },
        category: { attributes: { label: fixturePodcastTwo.genre } },
      },
    ],
  },
};

export const fixtureLookupResponse: ItunesLookupResponse = {
  resultCount: 2,
  results: [
    {
      wrapperType: "track",
      kind: "podcast",
      collectionId: Number(fixturePodcast.id),
      artistName: fixturePodcast.author,
      artistViewUrl: fixturePodcast.authorUrl,
      collectionName: fixturePodcast.title,
      artworkUrl600: fixturePodcast.image,
      description: fixturePodcast.description,
      primaryGenreName: fixturePodcast.genre,
    },
    {
      wrapperType: "podcastEpisode",
      kind: "podcast-episode",
      collectionId: Number(fixturePodcast.id),
      trackId: Number(fixtureEpisode.id),
      trackName: fixtureEpisode.title,
      description: fixtureEpisode.description,
      releaseDate: fixtureEpisode.releaseDate,
      trackTimeMillis: fixtureEpisode.durationMs,
      episodeUrl: fixtureEpisode.audioUrl,
    },
  ],
};
