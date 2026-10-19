import { DAY_MS } from "@/lib/constants";

export function isCacheFresh(
  timestamp: number,
  now = Date.now(),
  ttl = DAY_MS,
) {
  return now - timestamp < ttl;
}
