import { PAGINATION_WINDOW_SIZE } from "@/lib/constants";

export function getPaginationWindow(
  page: number,
  totalPages: number,
  windowSize = PAGINATION_WINDOW_SIZE,
) {
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, page - half);
  let end = start + windowSize - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - windowSize + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
