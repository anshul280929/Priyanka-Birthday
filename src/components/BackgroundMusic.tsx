import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  isPlaying: boolean;
}

export const BackgroundMusic = ({ isPlaying }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && isPlaying && hasInteracted) {
      audioRef.current.play().catch(() => {
        // Auto-play blocked, user needs to interact
      });
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, hasInteracted]);

  const handleToggle = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        if (isPlaying) {
          audioRef.current.play();
        }
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  if (!isPlaying) return null;

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-primary/20 hover:bg-secondary transition-colors"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-5 h-5 text-gold" />
      )}
    </button>
  );
};
