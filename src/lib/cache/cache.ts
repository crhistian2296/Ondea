import { DAY_MS } from "@/lib";

export function isCacheFresh(
  timestamp: number,
  now = Date.now(),
  ttl = DAY_MS,
) {
  return now - timestamp < ttl;
}
