import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

export const Navigation = () => {
  const navItems = ["Home", "About", "Projects", "Leaderboard", "Events", "Tools"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <div className="font-bold text-lg">EYEQ Club</div>
              <div className="text-xs text-muted-foreground">SIMATS</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
