import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            onComplete();
          }
        });
      }
    });

    // Logo animation
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "back.out(1.7)"
    });

    // Progress bar animation
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-20 floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Name */}
        <div
          ref={logoRef}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-glow bg-gradient-neon bg-clip-text text-transparent">
            TUSHAR
          </h1>
          <p className="text-xl text-muted-foreground mt-2">Full Stack Developer</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-1 bg-muted rounded-full mx-auto overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-primary rounded-full neon-glow"
            style={{ width: '0%' }}
          />
        </div>

        {/* Loading text */}
        <p className="text-sm text-muted-foreground mt-4 tracking-wider">
          LOADING EXPERIENCE...
        </p>
      </div>
    </div>
  );
};

export default Preloader;