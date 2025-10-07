import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-16 w-16 text-primary mx-auto" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Be Part of the Revolution 🌟
          </h2>

          <p className="text-xl text-muted-foreground">
            Fill out our registration form and step into a world of opportunities.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 shadow-glow hover:shadow-depth transition-all duration-300"
            >
              Register Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
