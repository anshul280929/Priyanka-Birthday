import { useState, useCallback } from 'react';
import { Sparkles, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/CountdownTimer';
import { AnimatedMessages } from '@/components/AnimatedMessages';
import { PhotoAlbum } from '@/components/PhotoAlbum';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { StarryBackground } from '@/components/StarryBackground';
import { Confetti } from '@/components/Confetti';

type Stage = 'countdown' | 'ready' | 'messages' | 'album' | 'complete';

const birthdayMessages = [
  "Every moment with you is a treasure",
  "Your smile lights up the world around you",
  "May this year bring you endless happiness",
  "You deserve all the love and joy today",
  "Here's to another amazing year ahead!",
];

const Index = () => {
  const [stage, setStage] = useState<Stage>('countdown');
  const [showConfetti, setShowConfetti] = useState(false);

  // Target date: January 2nd of the next occurrence
  const getTargetDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, 0, 2, 0, 0, 0); // January 2nd
    
    if (now >= targetDate) {
      targetDate = new Date(currentYear + 1, 0, 2, 0, 0, 0);
    }
    
    return targetDate;
  };

  const handleCountdownComplete = useCallback(() => {
    setStage('ready');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  const handleStart = () => {
    setStage('messages');
  };

  const handleMessagesComplete = () => {
    setStage('album');
  };

  const handleAlbumComplete = () => {
    setStage('complete');
  };

  const handleRestart = () => {
    setStage('ready');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarryBackground />
      <BackgroundMusic isPlaying={stage !== 'countdown'} />
      {showConfetti && <Confetti />}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {stage === 'countdown' && (
          <div className="text-center space-y-12 animate-fade-in-up">
            <div className="space-y-4">
              <Sparkles className="w-12 h-12 text-gold mx-auto animate-float" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground">
                Something <span className="text-gold text-shadow-glow">Special</span>
              </h1>
              <p className="text-xl md:text-2xl font-body text-muted-foreground">
                is coming your way...
              </p>
            </div>
            <CountdownTimer
              targetDate={getTargetDate()}
              onComplete={handleCountdownComplete}
            />
            <p className="text-lg font-body text-muted-foreground mt-8">
              January 2nd 2026
            </p>
          </div>
        )}

        {stage === 'ready' && (
          <div className="text-center space-y-8 animate-scale-in">
            <PartyPopper className="w-16 h-16 text-gold mx-auto animate-float" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-gold text-shadow-glow">
              It's Time!
            </h1>
            <p className="text-xl md:text-2xl font-body text-muted-foreground max-w-md mx-auto">
              The wait is over. Are you ready for your special celebration?
            </p>
            <Button
              onClick={handleStart}
              className="gradient-gold text-primary-foreground font-display text-xl px-12 py-7 rounded-full hover:scale-105 transition-transform animate-pulse-glow"
            >
              Let's Get Started
            </Button>
          </div>
        )}

        {stage === 'messages' && (
          <AnimatedMessages
            messages={birthdayMessages}
            onComplete={handleMessagesComplete}
          />
        )}

        {stage === 'album' && (
          <PhotoAlbum onComplete={handleAlbumComplete} />
        )}

        {stage === 'complete' && (
          <div className="text-center space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-display text-foreground">
              Hope you enjoyed your <span className="text-gold">celebration!</span>
            </h2>
            <p className="text-xl font-body text-muted-foreground">
              You can enjoy the memories or view it again
            </p>
            <Button
              onClick={handleRestart}
              className="gradient-gold text-primary-foreground font-display text-lg px-10 py-6 rounded-full hover:scale-105 transition-transform"
            >
              View Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
