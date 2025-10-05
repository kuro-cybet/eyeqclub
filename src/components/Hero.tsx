import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToJoin = () => {
    const element = document.getElementById('join');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center text-center px-6 pt-20 bg-gradient-to-b from-black to-background relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="max-w-4xl mx-auto space-y-6 animate-fade-in transform-gpu transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateZ(50px)`,
        }}
      >
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-slow transform transition-transform duration-300 hover:scale-110"
          style={{
            transform: `translateZ(80px) translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
          }}
        >
          Welcome to EYEQ Club
        </h1>
        <p 
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          style={{
            transform: `translateZ(60px) translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
          }}
        >
          Empowering Young Engineers with Quality
        </p>
        <Button 
          onClick={scrollToJoin}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(30,144,255,0.6)] transform-gpu"
          style={{
            transform: `translateZ(100px)`,
          }}
        >
          Join Us
        </Button>
      </div>
    </section>
  );
};

export default Hero;
