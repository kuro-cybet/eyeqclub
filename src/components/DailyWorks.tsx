import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export const DailyWorks = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Daily Works Update</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02, rotateX: 2 }}
          style={{ perspective: 1000 }}
        >
          <Card className="border-2 border-primary/20 shadow-depth hover:shadow-glow transition-all duration-500 max-w-3xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Activity className="h-12 w-12 text-primary" />
              </motion.div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stay tuned for regular updates, events, and progress reports from our members. 
                We're constantly working on exciting projects and organizing enriching events!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
