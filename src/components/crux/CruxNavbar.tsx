import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CruxNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={cn("fixed left-1/2 top-4 z-50 w-[min(94vw,1080px)] -translate-x-1/2 rounded-full border border-crux-line/10 bg-background/58 px-4 py-3 backdrop-blur-2xl transition-[box-shadow,background-color,border-color] duration-500", scrolled && "border-primary/20 bg-background/72 shadow-neon")}>
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-[0.24em]">
          <Cpu className="h-5 w-5 text-primary" />CRUX
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#workspace" className="transition hover:text-foreground">Workspace</a>
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#architecture" className="transition hover:text-foreground">Architecture</a>
          <Link to="/signin" className="transition hover:text-foreground">Sign in</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="glass" size="sm" className="rounded-full">
            <Link to="/signup">Launch</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
