"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type NavigationContextValue = {
  isNavigating: boolean;
  setNavigating: (isNavigating: boolean) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);

  const setNavigating = useCallback((navigating: boolean) => {
    setIsNavigating(navigating);
  }, []);

  const value = useMemo(
    () => ({ isNavigating, setNavigating }),
    [isNavigating, setNavigating],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationUi() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationUi debe usarse dentro de NavigationProvider");
  }
  return context;
}
