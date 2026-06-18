import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Auth from "./pages/Auth.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();
const cruxThemes = ["default", "contrast", "green", "light"] as const;

const initializeCruxTheme = () => {
  if (typeof window === "undefined") return;

  const storedTheme = localStorage.getItem("crux-theme");
  const currentIndex = cruxThemes.findIndex((theme) => theme === storedTheme);
  const nextTheme = currentIndex >= 0 ? cruxThemes[(currentIndex + 1) % cruxThemes.length] : "default";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("crux-theme", nextTheme);
};

initializeCruxTheme();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
