import { HomeCatalog } from "@/components";
import { loadPodcasts } from "@/lib";

export default async function HomePage() {
  const initialPodcasts = await loadPodcasts().catch(() => undefined);
  return <HomeCatalog initialPodcasts={initialPodcasts} />;
}
