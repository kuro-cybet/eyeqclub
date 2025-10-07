import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import MemberLogin from "./pages/MemberLogin";
import Projects from "./pages/Projects";
import Leaderboard from "./pages/Leaderboard";
import Events from "./pages/Events";
import VibeCoding from "./pages/VibeCoding";
import NotFound from "./pages/NotFound";
// removed PlexusBackground background layer

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative min-h-screen bg-transparent overflow-hidden">
          <BrowserRouter>
            <div className="relative z-10">
              {/* ✅ Marquee / Navbar / Content */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/member-login" element={<MemberLogin />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/vibe-coding" element={<VibeCoding />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
