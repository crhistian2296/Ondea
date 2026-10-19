"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type { ReactNode } from "react";
import { CatalogProvider, NavigationProvider, ThemeProvider } from "@/context";
import { QUERY_TTL_MS, getQueryClient, queryPersister } from "@/lib";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: QUERY_TTL_MS,
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
