import { useEffect, useRef, useState } from 'react';

interface BearerCardProps {
  image: string;
  title: string;
  name: string;
  delay?: number;
}

const BearerCard = ({ image, title, name, delay = 0 }: BearerCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl bg-card/40 backdrop-blur-sm border border-primary/20 p-6 transition-all duration-1000 transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{
        transform: `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isVisible ? 50 : 0}px) scale(${isVisible ? 1 : 0.8})`,
        transitionDelay: `${delay}ms`,
        boxShadow: `0 20px 60px -15px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        className="relative h-48 mb-4 overflow-hidden rounded-lg"
        style={{ transform: 'translateZ(30px)' }}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-125" 
          style={{ filter: 'brightness(0.9)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
      <h3 
        className="text-xl font-semibold text-foreground mb-2"
        style={{ 
          transform: 'translateZ(20px)',
          textShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
        }}
      >
        {title}
      </h3>
      <p 
        className="text-muted-foreground"
        style={{ transform: 'translateZ(15px)' }}
      >
        {name}
      </p>
    </div>
  );
};

export default BearerCard;
