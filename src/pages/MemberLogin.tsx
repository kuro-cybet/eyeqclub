import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MemberLogin = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-32 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-border"
          whileHover={{ scale: 1.02, rotateY: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-16 h-16 text-secondary" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Member Portal
          </h2>
          <p className="text-muted-foreground text-center mb-8">Welcome back!</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="member-email">Email</Label>
              <Input
                id="member-email"
                type="email"
                placeholder="member@student.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="member-password">Password</Label>
              <Input
                id="member-password"
                type="password"
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            <Button className="w-full mt-6" size="lg" variant="secondary">
              Sign In
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link to="/" className="hover:text-primary transition-colors">
              ← Back to Home
            </Link>
          </p>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-center text-muted-foreground">
            🎨 Design Mockup Only - Non-functional
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemberLogin;
