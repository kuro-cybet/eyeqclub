import { useEffect, useRef, useState } from 'react';

interface BearerCardProps {
  image: string;
  title: string;
  name: string;
  delay?: number;
}

const BearerCard = ({ image, title, name, delay = 0 }: BearerCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div
      ref={cardRef}
      className={`bg-card rounded-xl p-8 text-center transition-all duration-500 hover:bg-card/80 hover:shadow-[0_0_30px_rgba(30,144,255,0.2)] hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-primary/30"
      />
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{name}</p>
    </div>
  );
};

export default BearerCard;
