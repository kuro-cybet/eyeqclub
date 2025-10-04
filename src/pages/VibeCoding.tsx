import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarqueeBanner from '@/components/MarqueeBanner';
import { Code2, Zap, Lightbulb, Sparkles } from 'lucide-react';

const VibeCoding = () => {
  const tips = [
    'Use console.log() smartly - it\'s your debugging best friend!',
    'Master Git: commit often, commit smart',
    'Learn keyboard shortcuts - speed up your workflow by 10x',
    'Code reviews make you a better developer',
    'Write tests - future you will thank present you',
    'Keep functions small and focused - one task per function',
    'Name variables clearly - code is read more than written',
    'DRY principle: Don\'t Repeat Yourself',
    'Use async/await for cleaner asynchronous code',
    'Learn regex - powerful pattern matching tool',
  ];

  const tools = [
    { name: 'VS Code', desc: 'Most popular code editor', icon: Code2 },
    { name: 'GitHub Copilot', desc: 'AI pair programmer', icon: Sparkles },
    { name: 'Postman', desc: 'API testing made easy', icon: Zap },
    { name: 'DevTools', desc: 'Browser debugging powerhouse', icon: Lightbulb },
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
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Vibe Coding Tools
            </h1>
            <p className="text-xl text-muted-foreground">Daily tips & tools for developers</p>
          </motion.div>

          {/* Scrolling Ticker */}
          <div className="mb-12 overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">💡 Daily Coding Tips</h2>
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="flex gap-8 whitespace-nowrap"
              >
                {[...tips, ...tips].map((tip, i) => (
                  <div
                    key={i}
                    className="bg-card px-6 py-4 rounded-xl border border-border inline-block"
                  >
                    <p className="text-lg">{tip}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Tools Grid */}
          <h2 className="text-3xl font-bold mb-8 text-center">Essential Developer Tools</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-card p-8 rounded-2xl border border-border hover:shadow-[0_0_30px_rgba(30,144,255,0.2)] transition-all"
                style={{ perspective: '1000px' }}
              >
                <tool.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                <p className="text-muted-foreground">{tool.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* News Feed Style Cards */}
          <h2 className="text-3xl font-bold mb-8 text-center">Latest in Tech</h2>
          <div className="space-y-6">
            {[
              { title: 'React 19 Release Candidate', date: '2024-10-01', tag: 'Framework' },
              { title: 'AI Code Generation Tools Comparison', date: '2024-09-28', tag: 'AI/ML' },
              { title: 'Web Performance Optimization Guide', date: '2024-09-25', tag: 'Tutorial' },
              { title: 'TypeScript 5.3 New Features', date: '2024-09-20', tag: 'Language' },
            ].map((news, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="bg-card p-6 rounded-xl border border-border flex items-center justify-between hover:shadow-[0_0_20px_rgba(30,144,255,0.2)] transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                      {news.tag}
                    </span>
                    <span className="text-sm text-muted-foreground">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold">{news.title}</h3>
                </div>
                <Sparkles className="w-6 h-6 text-secondary" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VibeCoding;
