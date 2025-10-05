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
      className={`py-20 px-6 text-center transition-all duration-700 transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div className="container mx-auto max-w-6xl transform transition-all duration-500 hover:scale-[1.02]">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground inline-block border-b-2 border-border pb-3 transform transition-all duration-300 hover:scale-110">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
