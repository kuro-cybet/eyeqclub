import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Trophy, Users, TrendingUp } from "lucide-react";

const values = [
  { icon: Lightbulb, text: "Innovate" },
  { icon: Trophy, text: "Compete" },
  { icon: Users, text: "Collaborate" },
  { icon: TrendingUp, text: "Grow" },
];

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Us</h2>
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                style={{ perspective: 1000 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <value.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{value.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 border-primary/20 shadow-depth hover:shadow-glow transition-all duration-500"
            style={{ 
              transform: 'perspective(1000px) rotateX(2deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4 text-center">Club Proposal</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our vision is to innovate, collaborate, and empower students through workshops, 
                competitions, and projects. We aim to build a community of passionate engineers 
                who are ready to take on the challenges of tomorrow.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
