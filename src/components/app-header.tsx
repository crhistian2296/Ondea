"use client";

import Link from "next/link";
import { useIsFetching } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigationUi } from "@/context/navigation-context";
import { useRouteTransitionFeedback } from "@/hooks/use-route-transition-feedback";
import { Podcast } from "lucide-react";

export function AppHeader() {
  useRouteTransitionFeedback();
  const isFetching = useIsFetching() > 0;
  const { isNavigating } = useNavigationUi();
  const showSpinner = isNavigating || isFetching;

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="app-header__logo">
          <div className="app-header__logo-content">
            <span>Ondea</span>
            <Podcast size={24} color="currentColor" strokeWidth={2} />
          </div>
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
