import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { DAY_MS } from "@/lib/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DAY_MS,
      gcTime: DAY_MS,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const queryPersister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : null,
  key: "ondea-query-cache",
});
