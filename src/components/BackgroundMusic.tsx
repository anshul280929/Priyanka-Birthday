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
    const audio = new Audio('/audio/background.mp3'); // LOCAL FILE
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = true; // start muted to allow autoplay

    audioRef.current = audio;

    // Try autoplay
    audio
      .play()
      .then(() => {
        // Autoplay succeeded
      })
      .catch(() => {
        // Autoplay blocked until user interaction
      });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleToggle = () => {
    setHasInteracted(true);

    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play();
    } else {
      audioRef.current.muted = true;
    }

    setIsMuted(!isMuted);
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
