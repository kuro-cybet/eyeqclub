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
    <div className="min-h-screen bg-background relative">
      <MarqueeBanner />
      <Header />
      <Hero />
      
      <Section id="about" title="About Us">
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Innovate • Compete • Collaborate • Grow
        </p>
      </Section>

      <Section id="proposal" title="Club Proposal" className="bg-card/30">
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Our vision is to innovate, collaborate, and empower students through workshops, 
          competitions, and projects. We aim to build a community of passionate engineers 
          who are ready to take on the challenges of tomorrow.
        </p>
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
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Stay tuned for regular updates, events, and progress reports from our members. 
          We're constantly working on exciting projects and organizing enriching events!
        </p>
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
