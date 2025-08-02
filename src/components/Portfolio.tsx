import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'unset';
    
    // Delay content visibility to ensure smooth transition
    setTimeout(() => {
      setIsContentVisible(true);
      
      // Wait for DOM to update, then animate
      setTimeout(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          gsap.fromTo('.main-content',
            {
              opacity: 0,
              filter: 'blur(10px)'
            },
            {
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.5,
              ease: "power3.out"
            }
          );
        } else {
          // Fallback if GSAP fails
          const content = document.querySelector('.main-content');
          if (content) {
            (content as HTMLElement).style.opacity = '1';
          }
        }
      }, 50);
    }, 100);
  };

  useEffect(() => {
    if (isContentVisible) {
      // Initialize smooth scrolling behavior
      const initSmoothScroll = () => {
        // Simple smooth scroll implementation
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.slice(1);
            const targetElement = document.getElementById(targetId || '');
            
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
      };

      initSmoothScroll();

      // Parallax effect for floating elements
      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach((element, index) => {
          const speed = 0.1 + (index * 0.05);
          const yPos = -(scrolled * speed);
          gsap.set(element, { y: yPos });
        });
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isContentVisible]);

  return (
    <div ref={containerRef} className="relative">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      {isContentVisible && (
        <div className="main-content opacity-0" style={{ minHeight: '100vh' }}>
          <Navigation />
          
          <main className="relative">
            {/* Background decoration */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
              
              {/* Floating geometric shapes */}
              <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full parallax opacity-30"></div>
              <div className="absolute top-40 right-20 w-16 h-16 bg-neon-cyan/10 rotate-45 parallax"></div>
              <div className="absolute bottom-40 left-20 w-12 h-12 border border-neon-purple/30 parallax"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 border border-neon-pink/20 rounded-full parallax opacity-40"></div>
            </div>
            
            {/* Page Sections */}
            <div className="relative z-10">
              <Hero />
              <About />
              <Projects />
              <Contact />
            </div>
          </main>
          
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Portfolio;