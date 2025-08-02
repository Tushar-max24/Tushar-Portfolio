import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer slide-up animation
    gsap.fromTo(
      footer,
      {
        y: 60,
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating particle animation
    gsap.to('.footer-particle', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubLogo,
      url: 'https://github.com/Tushar-max24',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      url: 'https://www.linkedin.com/in/tushar-sharma-b6b33b258/',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer ref={footerRef} className="relative py-16 px-6 mt-20 border-t border-border/20">
      {/* Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`footer-particle absolute w-1 h-1 rounded-full opacity-30 ${
              i % 3 === 0
                ? 'bg-neon-blue'
                : i % 3 === 1
                ? 'bg-neon-cyan'
                : 'bg-neon-purple'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              TusharVerse
            </h2>
            <p className="text-muted-foreground text-sm">
              Crafting digital experiences with passion and precision.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <nav className="flex flex-wrap justify-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-muted/20 p-2 rounded-full hover:scale-110 hover:neon-glow transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-primary my-8 opacity-30"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            <span>© 2025, Made with</span>
            <Heart className="text-red-500" size={16} weight="fill" />
            <span>by</span>
            <span className="text-primary font-medium">TusharVerse</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
