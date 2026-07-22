import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "huzzler-theme";

export function useTheme(defaultTheme: "dark" | "light" = "dark") {
  const [theme, setTheme] = useState<"dark" | "light">(defaultTheme);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem(KEY) as "dark" | "light" | null)) || defaultTheme;
    setTheme(saved);
  }, [defaultTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem(KEY, theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return { theme, toggle, setTheme };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme("dark");
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-border bg-card text-foreground hover:text-primary hover:ring-primary transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
