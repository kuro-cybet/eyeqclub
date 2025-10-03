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
      <div className="container mx-auto px-6 flex justify-between items-center">
        <img 
          src={logo} 
          alt="EYEQ Club Logo" 
          className={`transition-all duration-300 hover:rotate-[-5deg] hover:scale-105 cursor-pointer ${
            isScrolled ? 'h-12' : 'h-16'
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        <nav className="flex gap-8">
          {['about', 'proposal', 'bearers', 'updates', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium capitalize"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
