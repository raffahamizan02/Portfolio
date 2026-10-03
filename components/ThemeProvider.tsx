"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type ThemeContextValue = {
  theme: "dark";
  toggleTheme: () => void;
  setTheme: (theme: "dark") => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => { },
  setTheme: () => { },
});

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeContext.Provider
      value={{
        theme: "dark",
        toggleTheme: () => { },
        setTheme: () => { },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}