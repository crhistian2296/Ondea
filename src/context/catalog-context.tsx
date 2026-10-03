"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CatalogState = {
  search: string;
  genre: string;
  isNavigating: boolean;
};

type CatalogContextValue = CatalogState & {
  setSearch: (search: string) => void;
  setGenre: (genre: string) => void;
  setNavigating: (isNavigating: boolean) => void;
};

const initialCatalogState: CatalogState = {
  search: "",
  genre: "all",
  isNavigating: false,
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CatalogState>(initialCatalogState);

  const setSearch = useCallback((search: string) => {
    setState((prev) => ({ ...prev, search }));
  }, []);

  const setGenre = useCallback((genre: string) => {
    setState((prev) => ({ ...prev, genre }));
  }, []);

  const setNavigating = useCallback((isNavigating: boolean) => {
    setState((prev) => ({ ...prev, isNavigating }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setSearch,
      setGenre,
      setNavigating,
    }),
    [state, setSearch, setGenre, setNavigating],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog debe usarse dentro de CatalogProvider");
  }
  return context;
}
