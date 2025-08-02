import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Headline animation
    tl.from(headlineRef.current, {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: "power3.out"
    });

    // Subtitle animation
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

    // CTA animation
    tl.from(ctaRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Spline animation
    tl.from(splineRef.current, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1");

    // Floating orbs animation
    gsap.set('.floating-orb', { opacity: 0 });
    gsap.to('.floating-orb', {
      opacity: 0.6,
      duration: 2,
      stagger: 0.3,
      delay: 2
    });

    gsap.to('.floating-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // CTA hover animation
    if (ctaRef.current) {
      const cta = ctaRef.current;
      
      const hoverIn = () => {
        gsap.to(cta, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const hoverOut = () => {
        gsap.to(cta, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      cta.addEventListener('mouseenter', hoverIn);
      cta.addEventListener('mouseleave', hoverOut);

      return () => {
        cta.removeEventListener('mouseenter', hoverIn);
        cta.removeEventListener('mouseleave', hoverOut);
        tl.kill();
      };
    }
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Spline 3D Model */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-ydt66bRdvwhMg8SlGyrFn2yG/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Floating Neon Orbs */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`floating-orb absolute w-4 h-4 rounded-full floating ${
              i % 3 === 0 ? 'bg-neon-blue' : i % 3 === 1 ? 'bg-neon-cyan' : 'bg-neon-purple'
            } neon-glow`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <div ref={headlineRef} className="blur-to-clear">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-glow">Hi, I'm</span>
            <span className="block bg-gradient-neon bg-clip-text text-transparent">
              Tushar
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-light">
              Web Developer
            </span>
          </h1>
        </div>

        <div ref={subtitleRef} className="blur-to-clear">
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
          </p>
        </div>

        <button
          ref={ctaRef}
          className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg neon-glow hover:shadow-glow transition-all duration-300 blur-to-clear"
        >
          Hire Me
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;