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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div 
        className="text-center transform-gpu transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(2000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(100px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <h1 
          className="text-6xl md:text-8xl font-bold mb-6 text-white animate-pulse-slow"
          style={{
            transform: `translateZ(${80 + Math.abs(mousePosition.x)}px)`,
            textShadow: '0 0 30px rgba(255, 255, 255, 0.15), 0 0 50px rgba(255, 255, 255, 0.1)',
          }}
        >
          Welcome to EYEQ Club
        </h1>
        <p 
          className="text-xl md:text-2xl text-gray-300 mb-8 transform transition-transform duration-500"
          style={{
            transform: `translateZ(${50 + Math.abs(mousePosition.y)}px)`,
          }}
        >
          Empowering Young Engineers with Quality
        </p>
        <Button
          onClick={scrollToJoin}
          size="lg"
          className="text-lg px-8 py-6 transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/20 relative"
          style={{
            transform: `translateZ(${100 + Math.abs(mousePosition.x) * 2}px) scale(${1 + Math.abs(mousePosition.x) * 0.002})`,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
          }}
        >
          Join Us
        </Button>
      </div>
    </section>
  );
};

export default Hero;
