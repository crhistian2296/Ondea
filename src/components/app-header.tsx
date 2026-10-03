"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { Spinner } from "@/components/spinner";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCatalog } from "@/context/catalog-context";

export function AppHeader() {
  const pathname = usePathname();
  const isFetching = useIsFetching() > 0;
  const { isNavigating, setNavigating } = useCatalog();
  const showSpinner = isNavigating || isFetching;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:")
      ) {
        return;
      }
      if (anchor.getAttribute("target") === "_blank") {
        return;
      }
      if (href === pathname) {
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

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="app-header__logo">
          Ondea
        </Link>
        <div className="app-header__actions">
          <div
            className="app-header__spinner-slot"
            aria-live="polite"
            aria-busy={showSpinner}
          >
            <Spinner
              className={`app-header__spinner${showSpinner ? "" : " app-header__spinner--hidden"}`}
              aria-hidden={!showSpinner}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
