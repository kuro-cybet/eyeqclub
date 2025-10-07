import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const bearers = [
  { role: "Club Incharge", name: "Prassanna" },
  { role: "President", name: "Aswath S" },
  { role: "Vice President", name: "Sasvanthu G" },
  { role: "Secretary", name: "Harsh Limkar" },
  { role: "PR Lead", name: "Rithika" },
  { role: "Design Lead", name: "Thaslima" },
];

export const OfficeBearers = () => {
  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Office Bearers</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bearers.map((bearer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateY: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ perspective: 1000 }}
              className="h-full"
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-depth group"
                style={{
                  transform: 'translateZ(0)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                    {bearer.role}
                  </h3>
                  <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {bearer.name}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
