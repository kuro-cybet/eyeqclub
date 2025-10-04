import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarqueeBanner from '@/components/MarqueeBanner';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const topContributors = [
    { rank: 1, name: 'Aswath S', points: 950, contributions: 47, badge: 'Gold' },
    { rank: 2, name: 'Sasvanthu G', points: 890, contributions: 42, badge: 'Silver' },
    { rank: 3, name: 'Harsh Limkar', points: 850, contributions: 39, badge: 'Bronze' },
    { rank: 4, name: 'Rithika', points: 780, contributions: 35, badge: 'Rising Star' },
    { rank: 5, name: 'Thaslima', points: 720, contributions: 31, badge: 'Creative' },
    { rank: 6, name: 'Priya Sharma', points: 680, contributions: 28, badge: 'Active' },
    { rank: 7, name: 'Rahul Kumar', points: 640, contributions: 25, badge: 'Consistent' },
    { rank: 8, name: 'Ananya Singh', points: 590, contributions: 22, badge: 'Innovator' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2: return <Medal className="w-8 h-8 text-gray-400" />;
      case 3: return <Award className="w-8 h-8 text-orange-400" />;
      default: return <TrendingUp className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MarqueeBanner />
      <Header />

      <div className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-xl text-muted-foreground">Top Contributors & Active Members</p>
          </motion.div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {topContributors.slice(0, 3).map((member, i) => (
              <motion.div
                key={member.rank}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className={`bg-gradient-to-br ${
                  member.rank === 1 ? 'from-yellow-500/20 to-yellow-600/10' :
                  member.rank === 2 ? 'from-gray-400/20 to-gray-500/10' :
                  'from-orange-500/20 to-orange-600/10'
                } p-8 rounded-2xl text-center border-2 ${
                  member.rank === 1 ? 'border-yellow-500/50' :
                  member.rank === 2 ? 'border-gray-400/50' :
                  'border-orange-500/50'
                } ${member.rank === 1 ? 'md:order-2 md:scale-110 md:z-10' : member.rank === 2 ? 'md:order-1' : 'md:order-3'}`}
                style={{ perspective: '1000px' }}
              >
                <div className="flex justify-center mb-4">
                  {getRankIcon(member.rank)}
                </div>
                <div className="text-4xl font-bold mb-2">#{member.rank}</div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <div className="text-3xl font-bold text-primary mb-2">{member.points}</div>
                <p className="text-sm text-muted-foreground">{member.contributions} contributions</p>
                <div className="mt-4 px-3 py-1 bg-card rounded-full text-sm font-medium inline-block">
                  {member.badge}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of the Leaderboard */}
          <div className="space-y-4">
            {topContributors.slice(3).map((member, i) => (
              <motion.div
                key={member.rank}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-card p-6 rounded-xl border border-border flex items-center justify-between hover:shadow-[0_0_20px_rgba(30,144,255,0.2)] transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(member.rank)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.contributions} contributions</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{member.points}</div>
                  <div className="text-sm text-muted-foreground">{member.badge}</div>
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

export default Leaderboard;
