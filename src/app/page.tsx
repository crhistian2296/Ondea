import { HomeCatalog } from "@/components";
import { loadPodcasts } from "@/lib/load-podcasts/load-podcasts";

export default async function HomePage() {
  const initialPodcasts = await loadPodcasts().catch(() => undefined);
  return <HomeCatalog initialPodcasts={initialPodcasts} />;
}
