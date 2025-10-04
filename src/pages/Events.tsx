import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarqueeBanner from '@/components/MarqueeBanner';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const Events = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const events = [
    {
      title: 'AI/ML Hackathon 2024',
      date: 'October 15, 2024',
      location: 'SIMATS Campus',
      description: '24-hour coding marathon focused on AI and Machine Learning solutions',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
    },
    {
      title: 'Web Development Workshop',
      date: 'October 22, 2024',
      location: 'Computer Lab A',
      description: 'Learn modern web development with React and Tailwind CSS',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'
    },
    {
      title: 'Tech Talk: Future of IoT',
      date: 'November 5, 2024',
      location: 'Auditorium',
      description: 'Industry experts discuss the future of Internet of Things',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2024-10-15T09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % events.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);

  return (
    <div className="min-h-screen bg-background">
      <MarqueeBanner />
      <Header />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Upcoming Events
            </h1>
            <p className="text-xl text-muted-foreground">Join us for exciting hackathons & competitions</p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 rounded-2xl mb-12 border border-border"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Next Hackathon Starts In:</h2>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  className="bg-card p-6 rounded-xl text-center"
                  style={{ perspective: '1000px' }}
                >
                  <div className="text-4xl font-bold text-primary mb-2">{value}</div>
                  <div className="text-sm text-muted-foreground uppercase">{unit}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Event Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="relative h-[500px]"
              >
                <img
                  src={events[currentSlide].image}
                  alt={events[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-4xl font-bold mb-4"
                    >
                      {events[currentSlide].title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg mb-4"
                    >
                      {events[currentSlide].description}
                    </motion.p>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {events[currentSlide].date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {events[currentSlide].location}
                      </div>
                    </div>
                    <Button size="lg">Register Now</Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-3 rounded-full hover:bg-card transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-3 rounded-full hover:bg-card transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-primary w-8' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
