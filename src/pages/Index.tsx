import MarqueeBanner from '@/components/MarqueeBanner';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import BearerCard from '@/components/BearerCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

import bearer1 from '@/assets/bearer1.jpg';
import bearer2 from '@/assets/bearer2.jpg';
import bearer3 from '@/assets/bearer3.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      <MarqueeBanner />
      <Header />
      <Hero />
      
      <Section id="about" title="About Us">
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
          Innovate • Compete • Collaborate • Grow
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
            <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
            <p className="text-muted-foreground">Active Members</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
            <h3 className="text-4xl font-bold text-secondary mb-2">50+</h3>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
            <h3 className="text-4xl font-bold text-accent mb-2">25+</h3>
            <p className="text-muted-foreground">Events Organized</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
            <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
            <p className="text-muted-foreground">Passion Driven</p>
          </div>
        </div>
      </Section>

      <Section id="proposal" title="Club Proposal" className="bg-card/30">
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
          Our vision is to innovate, collaborate, and empower students through workshops, 
          competitions, and projects. We aim to build a community of passionate engineers 
          who are ready to take on the challenges of tomorrow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all">
            <h3 className="text-2xl font-bold text-primary mb-4">🎯 Our Mission</h3>
            <p className="text-muted-foreground">
              To foster innovation and technical excellence among engineering students through 
              hands-on learning, collaborative projects, and industry exposure.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-all">
            <h3 className="text-2xl font-bold text-secondary mb-4">👁️ Our Vision</h3>
            <p className="text-muted-foreground">
              Creating a platform where young engineers can explore cutting-edge technologies, 
              develop problem-solving skills, and build impactful solutions for real-world challenges.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-accent/20 hover:border-accent/50 transition-all">
            <h3 className="text-2xl font-bold text-accent mb-4">💡 Our Values</h3>
            <p className="text-muted-foreground">
              Innovation, collaboration, continuous learning, and empowerment. We believe in 
              quality over quantity and nurturing talent through mentorship and practical experience.
            </p>
          </div>
        </div>
      </Section>

      <Section id="bearers" title="Office Bearers">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <BearerCard image={bearer1} title="Club Incharge" name="Prassanna" delay={0} />
          <BearerCard image={bearer2} title="President" name="Aswath S" delay={100} />
          <BearerCard image={bearer3} title="Vice President" name="Sasvanthu G" delay={200} />
          <BearerCard image={bearer1} title="Secretary" name="Harsh Limkar" delay={300} />
          <BearerCard image={bearer2} title="PR Lead" name="Rithika" delay={400} />
          <BearerCard image={bearer3} title="Design Lead" name="Thaslima" delay={500} />
        </div>
      </Section>

      <Section id="updates" title="Daily Works Update" className="bg-card/30">
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
          Stay tuned for regular updates, events, and progress reports from our members. 
          We're constantly working on exciting projects and organizing enriching events!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-xl font-semibold mb-3 text-primary">🚀 Workshops & Training</h4>
            <p className="text-muted-foreground mb-3">
              Regular technical workshops on emerging technologies like AI/ML, Web Development, 
              IoT, Robotics, and Cloud Computing.
            </p>
            <p className="text-sm text-muted-foreground">Weekly sessions conducted by industry experts and alumni</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-xl font-semibold mb-3 text-secondary">🏆 Hackathons & Competitions</h4>
            <p className="text-muted-foreground mb-3">
              Participate in inter-college hackathons, coding competitions, and innovation challenges 
              to showcase your skills and win exciting prizes.
            </p>
            <p className="text-sm text-muted-foreground">Monthly coding contests and quarterly hackathons</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-xl font-semibold mb-3 text-accent">💻 Project Development</h4>
            <p className="text-muted-foreground mb-3">
              Collaborate on real-world projects, contribute to open source, and build innovative 
              solutions that make a difference in the community.
            </p>
            <p className="text-sm text-muted-foreground">Team-based projects with mentorship support</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-xl font-semibold mb-3 text-primary">🎤 Tech Talks & Seminars</h4>
            <p className="text-muted-foreground mb-3">
              Attend guest lectures by industry professionals, alumni networking sessions, 
              and career guidance workshops to prepare for your future.
            </p>
            <p className="text-sm text-muted-foreground">Bi-weekly sessions with industry leaders</p>
          </div>
        </div>
      </Section>

      <Section id="join" title="Be Part of the Revolution 🌟">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Fill out our registration form and step into a world of opportunities.
        </p>
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]"
        >
          Register Now
        </Button>
      </Section>

      <Footer />
    </div>
  );
};

export default Index;
