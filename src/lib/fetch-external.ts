import { allOriginsUrl } from "@/lib/constants";

export async function fetchExternalJson<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) {
      throw new Error(`Request failed ${response.status} for ${url}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(error);
    const fallback = await fetch(allOriginsUrl(url), {
      next: { revalidate: 86400 },
    });
    if (!fallback.ok) {
      throw new Error(`Fallback failed ${fallback.status} for ${url}`);
    }
    return (await fallback.json()) as T;
  }
}
