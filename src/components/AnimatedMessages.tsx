import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AnimatedMessagesProps {
  messages: string[];
  onComplete: () => void;
}

export const AnimatedMessages = ({ messages, onComplete }: AnimatedMessagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentIndex >= messages.length) {
      onComplete();
      return;
    }

    const showTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsVisible(true);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [currentIndex, messages.length, onComplete]);

  if (currentIndex >= messages.length) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-4">
      <div className="relative">
        <Sparkles className="absolute -top-8 -left-8 w-6 h-6 text-gold animate-float" />
        <Sparkles className="absolute -top-4 -right-10 w-4 h-4 text-rose-accent animate-float" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute -bottom-6 left-1/2 w-5 h-5 text-gold-light animate-float" style={{ animationDelay: '1s' }} />
        
        <p
          className={`text-2xl md:text-4xl font-display text-center text-foreground leading-relaxed max-w-2xl transition-all duration-500 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
          }`}
        >
          <span className="text-gold">"</span>
          {messages[currentIndex]}
          <span className="text-gold">"</span>
        </p>
      </div>
      
      <div className="flex gap-2 mt-12">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gold w-6'
                : index < currentIndex
                ? 'bg-gold/50'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
