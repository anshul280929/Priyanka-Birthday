import { useState } from 'react';
import { Camera, X, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Confetti } from './Confetti';

interface Photo {
  id: number;
  url: string;
  rotation: number;
}

interface PhotoAlbumProps {
  onComplete: () => void;
}

export const PhotoAlbum = ({ onComplete }: PhotoAlbumProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const photos: Photo[] = [
    { id: 1, url: 'https://ibb.co/KzVXLCwL', rotation: -8 },
    { id: 2, url: 'https://ibb.co/DgTgFkjR', rotation: 5 },
    { id: 3, url: 'https://ibb.co/rGtMKQxT', rotation: -3 },
    { id: 4, url: 'https://ibb.co/C3cQC9M2', rotation: 7 },
    { id: 5, url: 'https://ibb.co/1YdHxsPC', rotation: -5 },
    { id: 6, url: 'https://ibb.co/mVJjtXXL', rotation: 4 },
  ];

  const handleOpen = () => {
    setIsOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleClose = () => {
    setIsOpen(false);
    onComplete();
  };

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <p className="text-xl md:text-2xl font-body text-muted-foreground text-center">
          Click to reveal your birthday surprise!
        </p>
        <button
          onClick={handleOpen}
          className="group relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-secondary/50 border-2 border-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-primary animate-pulse-glow"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all" />
          <Camera className="w-12 h-12 md:w-16 md:h-16 text-gold group-hover:scale-110 transition-transform" />
          <Gift className="absolute -top-3 -right-3 w-8 h-8 text-rose-accent animate-float" />
        </button>
      </div>
    );
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-4">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        <h2 className="text-4xl md:text-6xl font-display text-gold text-shadow-glow mb-4 animate-scale-in">
          Happy Birthday Priyanka!
        </h2>
        <p className="text-xl md:text-2xl font-body text-muted-foreground mb-12 animate-fade-in-up">
          🎂 Wishing you all the joy and happiness! 🎂
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative animate-photo-pop"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'both',
              }}
            >
              <div
                className="relative overflow-hidden rounded-lg shadow-2xl border-4 border-secondary bg-card p-2"
                style={{ transform: `rotate(${photo.rotation}deg)` }}
              >
                <img
                  src={photo.url}
                  alt={`Birthday memory ${photo.id}`}
                  className="w-full h-32 md:h-48 object-cover rounded"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-lg md:text-xl font-body text-foreground mb-6">
            You can enjoy the memories or view it again!
          </p>
          <Button
            onClick={handleClose}
            className="gradient-gold text-primary-foreground font-display text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform"
          >
            View Again
          </Button>
        </div>
      </div>
    </>
  );
};
