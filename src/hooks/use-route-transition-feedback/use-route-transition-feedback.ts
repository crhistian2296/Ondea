"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useNavigationUi } from "@/context";

function isInternalNavigationAnchor(
  anchor: HTMLAnchorElement,
  pathname: string,
): boolean {
  const href = anchor.getAttribute("href");
  if (
    !href ||
    href.startsWith("http") ||
    href.startsWith("#") ||
    href.startsWith("mailto:")
  ) {
    return false;
  }
  if (anchor.getAttribute("target") === "_blank") {
    return false;
  }
  if (href === pathname) {
    return false;
  }
  return true;
}

export function useRouteTransitionFeedback() {
  const pathname = usePathname();
  const { setNavigating } = useNavigationUi();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || !isInternalNavigationAnchor(anchor, pathname)) {
        return;
      }
      setNavigating(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, setNavigating]);

  useEffect(() => {
    setNavigating(false);
  }, [pathname, setNavigating]);
}
