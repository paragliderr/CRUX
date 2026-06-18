import { useEffect, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { id: "default", label: "Default", icon: Moon },
  { id: "contrast", label: "Black + Yellow", icon: Palette },
  { id: "green", label: "Midnight Green", icon: Moon },
  { id: "light", label: "Soft Light", icon: Sun },
] as const;

type ThemeId = (typeof themes)[number]["id"];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("default");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("crux-theme") as ThemeId | null) ?? "default";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const applyTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("crux-theme", nextTheme);
    setOpen(false);
  };

  const ActiveIcon = themes.find((item) => item.id === theme)?.icon ?? Palette;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Switch CRUX theme"
        onClick={() => setOpen((value) => !value)}
        className="grid h-9 w-9 place-items-center rounded-full border border-crux-line/10 bg-surface-glass/5 text-muted-foreground transition duration-300 hover:border-primary/30 hover:text-foreground"
      >
        <ActiveIcon className="h-4 w-4" />
      </button>
      {open && (
        <div className="glass-panel absolute right-0 top-12 z-50 w-56 rounded-2xl p-2">
          {themes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => applyTheme(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition duration-300 hover:bg-surface-glass/10 hover:text-foreground",
                  theme === item.id && "bg-primary/10 text-primary",
                )}
              >
                <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</span>
                {theme === item.id && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
