import { motion } from "framer-motion";

export const ScrollingBanner = () => {
  const text = "🎉 Registration Open! Join EYEQ Club Today • 🌟 Be Part of the Revolution";
  
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-primary text-primary-foreground overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap py-2"
      >
        {[...Array(5)].map((_, i) => (
          <span key={i} className="mx-8 text-sm font-medium">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
