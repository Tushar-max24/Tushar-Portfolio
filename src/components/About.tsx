import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade in animation
    gsap.fromTo(section, 
      {
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Image animation
    gsap.fromTo(imageRef.current,
      {
        x: -100,
        opacity: 0,
        rotation: -10
      },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Skills stagger animation
    gsap.fromTo('.skill-icon',
      {
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'HTML5', icon: '🌐', color: 'text-orange-500' },
    { name: 'CSS3', icon: '🎨', color: 'text-blue-500' },
    { name: 'JavaScript', icon: '⚡', color: 'text-yellow-500' },
    { name: 'React', icon: '⚛️', color: 'text-cyan-500' },
    { name: 'Java', icon: '☕', color: 'text-blue-600' },
    { name: 'Firebase', icon: '🔥', color: 'text-green-500' },
    { name: 'Flutter', icon: '📱', color: 'text-purple-500' },
    { name: 'Figma', icon: '🎨', color: 'text-green-600' }
  ];

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-full bg-gradient-neon p-1 neon-glow">
                <div className="w-full h-full rounded-full bg-background overflow-hidden">
                  <img
                    src="/lovable-uploads/027cecd9-232d-417e-98db-3237d1a379c0.png"
                    alt="Tushar"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Floating particles around image */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full floating opacity-60"
                  style={{
                    left: `${15 + (i * 15)}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 1.2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-neon bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full mb-6"></div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
  Hi there! I'm <span className="text-primary font-semibold">Tushar</span>,
  a passionate full-stack developer and UI/UX designer from India, focused on building efficient, scalable, and visually engaging digital solutions.
</p>

<p>
  I specialize in developing dynamic web and mobile applications using Java, ReactJS, Firebase, and Flutter.
  My expertise also includes integrating cloud services and managing real-time data to deliver responsive, reliable user experiences.
</p>

<p>
  As a UI/UX designer, I use Figma to create intuitive and user-centered interface designs that enhance usability and engagement.
  I ensure every application I build not only functions seamlessly but also provides a polished and aesthetically pleasing experience.
</p>

<p>
  I’m always exploring new tools and technologies to stay ahead in the rapidly evolving tech landscape.
  My approach combines clean code, thoughtful design, and innovative thinking to deliver impactful and user-focused solutions.
</p>


            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="mt-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Tech Stack</h3>
              <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-icon glass p-4 rounded-lg text-center hover:scale-110 hover:neon-glow transition-all duration-300 cursor-pointer"
                  >
                    <div className={`text-2xl mb-2 ${skill.color}`}>
                      {skill.icon}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;