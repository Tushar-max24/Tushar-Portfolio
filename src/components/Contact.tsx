import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  EnvelopeSimple,
  User,
  ChatCircle
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.contact-title',
      {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.form-field',
      {
        x: -50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.social-icon',
      {
        y: 30,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-icons',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 contact-title">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you have an idea, a challenge, or just want to connect — I'm always open to new opportunities and discussions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <EnvelopeSimple className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">tusharjangid98870@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <ChatCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">+91 9509211603</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="social-icons">
              <h3 className="font-semibold text-foreground mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon bg-muted/20 p-3 rounded-full hover:scale-110 hover:neon-glow transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            action="https://formspree.io/f/mnnzbddg"
            method="POST"
            className="space-y-6"
          >
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                <User className="inline mr-2" size={16} />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full glass px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                <EnvelopeSimple className="inline mr-2" size={16} />
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full glass px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Your email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                <ChatCircle className="inline mr-2" size={16} />
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full glass px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="submit-btn w-full bg-gradient-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold neon-glow hover:scale-105 hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <PaperPlaneTilt size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
