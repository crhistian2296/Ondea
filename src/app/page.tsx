import { HomeCatalog } from "@/components/home-catalog";
import { loadPodcasts } from "@/lib/load-podcasts";

export default async function HomePage() {
  const initialPodcasts = await loadPodcasts().catch(() => undefined);
  return <HomeCatalog initialPodcasts={initialPodcasts} />;
}
