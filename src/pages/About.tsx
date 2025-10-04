import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarqueeBanner from '@/components/MarqueeBanner';
import BearerCard from '@/components/BearerCard';
import bearer1 from '@/assets/bearer1.jpg';
import bearer2 from '@/assets/bearer2.jpg';
import bearer3 from '@/assets/bearer3.jpg';
import { Target, Eye, Rocket } from 'lucide-react';

const About = () => {
  const bearers = [
    { image: bearer1, title: 'Club Incharge', name: 'Prassanna' },
    { image: bearer2, title: 'President', name: 'Aswath S' },
    { image: bearer3, title: 'Vice President', name: 'Sasvanthu G' },
    { image: bearer1, title: 'Secretary', name: 'Harsh Limkar' },
    { image: bearer2, title: 'PR Lead', name: 'Rithika' },
    { image: bearer3, title: 'Design Lead', name: 'Thaslima' },
  ];

  const timeline = [
    { year: '2024', event: 'EYEQ Club Founded' },
    { year: '2024', event: 'First Hackathon Organized' },
    { year: '2024', event: '100+ Active Members' },
    { year: '2025', event: 'Regional Competition Winners' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MarqueeBanner />
      <Header />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            About EYEQ Club
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            Innovating with Vision & Vibe Coding
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Mission', text: 'To empower students with quality engineering skills through innovation and collaboration.' },
              { icon: Eye, title: 'Vision', text: 'Creating a community of passionate engineers ready to tackle tomorrow\'s challenges.' },
              { icon: Rocket, title: 'Values', text: 'Innovation, Collaboration, Excellence, and Continuous Learning.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-card p-8 rounded-xl text-center"
                style={{ perspective: '1000px' }}
              >
                <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Bearers */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Meet Our Bearers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bearers.map((bearer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <BearerCard {...bearer} delay={0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Journey Timeline */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Our Journey
          </motion.h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6"
              >
                <div className="bg-primary text-primary-foreground w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.year}
                </div>
                <div className="bg-card p-6 rounded-xl flex-1">
                  <p className="text-lg">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
