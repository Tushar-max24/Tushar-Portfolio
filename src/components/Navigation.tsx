import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.to('.mobile-menu', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        x: '100%',
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'glass backdrop-blur-lg shadow-glass' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Tushar Sharma
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-sm font-medium tracking-wide"
                >
                  {item.label}
                </a>
              ))}
              <button className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full font-medium neon-glow hover:scale-105 transition-transform duration-300">
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-foreground hover:text-primary transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 w-full h-full z-50 glass backdrop-blur-lg opacity-0 transform translate-x-full md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={toggleMenu}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <button className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-full font-medium neon-glow">
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;