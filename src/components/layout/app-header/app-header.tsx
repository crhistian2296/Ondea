"use client";

import Link from "next/link";
import { useIsFetching } from "@tanstack/react-query";
import { useNavigationUi } from "@/context";
import { useRouteTransitionFeedback } from "@/hooks";
import { HEADER_LOGO_ICON_SIZE, HEADER_LOGO_ICON_STROKE_WIDTH } from "@/lib";
import { Podcast } from "lucide-react";
import { Spinner } from "../spinner/spinner";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

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
            <Podcast
              size={HEADER_LOGO_ICON_SIZE}
              color="currentColor"
              strokeWidth={HEADER_LOGO_ICON_STROKE_WIDTH}
            />
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
