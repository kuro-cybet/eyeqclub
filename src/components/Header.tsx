import { useState, useEffect } from 'react';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md py-3 shadow-lg' : 'bg-black py-4'
    }`}>
      <div className="w-full px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={logo} 
            alt="EYEQ Club Logo" 
            className={`transition-all duration-300 hover:rotate-[-5deg] hover:scale-105 cursor-pointer ${
              isScrolled ? 'h-12' : 'h-16'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <div className="flex flex-col">
            <span className={`font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}>
              EYEQ Club
            </span>
            <span className={`text-muted-foreground font-medium transition-all duration-300 ${
              isScrolled ? 'text-xs' : 'text-sm'
            }`}>
              SIMATS
            </span>
          </div>
        </div>
        <nav className="flex gap-6 items-center">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/projects', label: 'Projects' },
            { path: '/leaderboard', label: 'Leaderboard' },
            { path: '/events', label: 'Events' },
            { path: '/vibe-coding', label: 'Tools' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
