"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type { ReactNode } from "react";
import { CatalogProvider } from "@/context/catalog-context";
import { NavigationProvider } from "@/context/navigation-context";
import { ThemeProvider } from "@/context/theme-context";
import { DAY_MS } from "@/lib/constants";
import { getQueryClient, queryPersister } from "@/lib/query-client";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: DAY_MS,
        buster: "ondea-v4",
      }}
    >
      <ThemeProvider>
        <NavigationProvider>
          <CatalogProvider>{children}</CatalogProvider>
        </NavigationProvider>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
