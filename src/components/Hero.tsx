import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToJoin = () => {
    const element = document.getElementById('join');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 pt-20 bg-gradient-to-b from-black to-background">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-slow">
          Welcome to EYEQ Club
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Empowering Young Engineers with Quality
        </p>
        <Button 
          onClick={scrollToJoin}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]"
        >
          Join Us
        </Button>
      </div>
    </section>
  );
};

export default Hero;
