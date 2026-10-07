import { allOriginsUrl, DAY_SECONDS } from "@/lib/constants";

export async function fetchExternalJson<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { next: { revalidate: DAY_SECONDS } });
    if (!response.ok) {
      throw new Error(`Request failed ${response.status} for ${url}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(error);
    const fallback = await fetch(allOriginsUrl(url), {
      next: { revalidate: DAY_SECONDS },
    });
    if (!fallback.ok) {
      throw new Error(`Fallback failed ${fallback.status} for ${url}`);
    }
    return (await fallback.json()) as T;
  }
}
