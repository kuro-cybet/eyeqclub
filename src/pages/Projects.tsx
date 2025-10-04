import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarqueeBanner from '@/components/MarqueeBanner';
import { Button } from '@/components/ui/button';
import { Calendar, User, Code } from 'lucide-react';

const Projects = () => {
  const updates = [
    {
      title: 'AI Chatbot Development',
      team: 'Team Alpha',
      date: '2024-10-01',
      description: 'Completed sentiment analysis module using NLP techniques.',
      status: 'In Progress'
    },
    {
      title: 'IoT Smart Campus',
      team: 'Team Beta',
      date: '2024-09-28',
      description: 'Deployed temperature sensors across 5 buildings.',
      status: 'Testing'
    },
    {
      title: 'Mobile App - Student Portal',
      team: 'Team Gamma',
      date: '2024-09-25',
      description: 'UI/UX design finalized, backend API integration started.',
      status: 'In Progress'
    },
    {
      title: 'Blockchain Voting System',
      team: 'Team Delta',
      date: '2024-09-20',
      description: 'Smart contract deployed on testnet, security audit pending.',
      status: 'Review'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MarqueeBanner />
      <Header />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Team Project Updates
            </h1>
            <p className="text-xl text-muted-foreground">Track our ongoing innovations</p>
          </motion.div>

          {/* Team Login Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl border border-border mb-12 text-center"
          >
            <Code className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Team Member Access</h3>
            <p className="text-muted-foreground mb-4">Post your daily progress updates</p>
            <Button size="lg">Team Login (Design Only)</Button>
            <div className="mt-4 p-2 bg-muted/30 rounded text-xs text-muted-foreground">
              🎨 UI Mockup - Non-functional
            </div>
          </motion.div>

          {/* Project Updates Feed */}
          <div className="space-y-6">
            {updates.map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-[0_0_30px_rgba(30,144,255,0.2)] transition-all"
                style={{ perspective: '1000px' }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{update.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    update.status === 'In Progress' ? 'bg-primary/20 text-primary' :
                    update.status === 'Testing' ? 'bg-secondary/20 text-secondary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {update.status}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{update.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{update.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{update.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
