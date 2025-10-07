import { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, title, children, className = '' }: SectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 px-6 text-center transition-all duration-1000 transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0 translate-z-0' : 'opacity-0 translate-y-20'
      } ${className}`}
      style={{ 
        perspective: '2000px',
        transformStyle: 'preserve-3d',
        transform: isVisible ? 'translateZ(0)' : 'translateZ(-200px)',
      }}
    >
      <div 
        className="container mx-auto max-w-6xl transform transition-all duration-700 hover:scale-[1.03]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isVisible ? 'rotateX(0deg) translateZ(50px)' : 'rotateX(-15deg) translateZ(0)',
        }}
      >
        <h2 
          className="text-4xl md:text-5xl font-bold mb-8 text-foreground inline-block border-b-2 border-primary pb-3 transform transition-all duration-500 hover:scale-110"
          style={{
            textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(30px)',
          }}
        >
          {title}
        </h2>
        <div style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
