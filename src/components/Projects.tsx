import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Eye, X } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.projects-title',
      { opacity: 0, y: 50, filter: 'blur(10px)' },
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
      '.project-card',
      { y: 100, opacity: 0, scale: 0.9, filter: 'blur(5px)' },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Restaurant Recommendation System',
      description:
        'Developed a web-based app to recommend restaurants based on user preferences. Integrated and tested recommendation algorithms.',
      image: '/images/restaurant.jpg',
      tech: ['HTML', 'CSS', 'JavaScript'],
      category: 'Web App',
      github: 'https://github.com/Tushar-max24/Restaurant-Suggestion'
    },
    {
      id: 2,
      title: 'Wheelchair Fall Detection System',
      description:
        'IoT-based fall detection system for wheelchairs. Sends SMS alerts upon detecting a fall to ensure user safety.',
      image: '/images/wheelchair.jpg',
      tech: ['IoT', 'SMS'],
      category: 'IoT System',
      github: 'https://github.com/Tushar-max24'
    },
    {
      id: 3,
      title: 'Smart Campus Cleanliness System',
      description:
        'Flutter-based mobile app to report and manage campus cleanliness with Firebase backend and machine learning integration.',
      image: '/images/sccms.jpg',
      tech: ['Flutter', 'Firebase', 'Machine Learning', 'Dart'],
      category: 'Mobile App',
      github: 'https://github.com/Tushar-max24/sccms_app'
    },
    {
      id: 4,
      title: 'Brainwave AI',
      description:
        'Creative frontend concept using HTML, CSS, and JS to simulate brainwave visualization powered by AI.',
      image: '/images/brainwave.jpg',
      tech: ['JavaScript', 'HTML', 'CSS'],
      category: 'Web Design',
      github: 'https://github.com/Tushar-max24/brainwave_ai'
    },
    {
      id: 5,
      title: 'Smart Community App',
      description:
        'All-in-one community management app for tasks like expense tracking, issue reporting, weather, and news updates.',
      image: '/images/community.jpg',
      tech: ['Flutter', 'Firebase', 'Dart'],
      category: 'Mobile App',
      github: 'https://github.com/Tushar-max24/smart_community'
    },
    {
      id: 6,
      title: 'EV-Cycle UI/UX Design',
      description:
        'UI/UX design prototype for an EV cycle rental system created using Figma, focused on usability and aesthetics.',
      image: '/images/ev-cycle.jpg',
      tech: ['Figma'],
      category: 'UI/UX Design',
      github: 'https://github.com/Tushar-max24/EV_Cycle_Figma'
    },
    {
      id: 7,
      title: 'Book Inventory Management UI',
      description:
        'UI/UX design for managing books in libraries or bookstores. Includes add, view, and borrow tracking features.',
      image: '/images/book-inventory.jpg',
      tech: ['Figma'],
      category: 'UI/UX Design',
      github: 'https://github.com/Tushar-max24/book-inventory-ui'
    }
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 projects-title">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-neon bg-clip-text text-transparent">Featured Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring practical solutions and clean designs using modern technologies.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group glass rounded-2xl overflow-hidden hover:neon-glow transition-all duration-500 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover object-center rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-primary text-primary-foreground p-3 rounded-full neon-glow hover:scale-110 transition-transform duration-300"
                    >
                      <Eye size={20} />
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-accent-foreground p-3 rounded-full neon-glow hover:scale-110 transition-transform duration-300"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-full font-medium neon-glow hover:scale-105 transition-all duration-300"
          >
            {showAll ? 'Show Less' : 'View All Projects'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background rounded-xl shadow-xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="rounded-md mb-4 w-full max-h-[70vh] object-contain"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
            <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
