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
};

type CatalogContextValue = CatalogState & {
  setSearch: (search: string) => void;
  setGenre: (genre: string) => void;
};

const initialCatalogState: CatalogState = {
  search: "",
  genre: "all",
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

  const value = useMemo(
    () => ({
      ...state,
      setSearch,
      setGenre,
    }),
    [state, setSearch, setGenre],
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
