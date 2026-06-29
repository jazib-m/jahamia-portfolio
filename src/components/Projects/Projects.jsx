import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

const projectsList = [
  {
    title: 'SuggestBabyName Web',
    client: 'Consumer App',
    category: 'AI Naming Platform',
    tags: ['React', 'Next.js', 'AI API', 'Vercel'],
    image: '/projects/baby-name-web.jpg',
    url: 'https://suggestbabyname.com/'
  },
  {
    title: 'Dummy Ticket Premium',
    client: 'Travel Services',
    category: 'Booking Platform',
    tags: ['Angular 21', 'Tailwind CSS v4', 'Anime.js', 'TypeScript'],
    image: '/projects/dummy-ticket.jpg',
    url: ''
  },
  {
    title: 'Building Management',
    client: 'Enterprise Systems',
    category: 'IoT & Real Estate',
    tags: ['TypeScript', 'React', 'Dashboard', 'Analytics'],
    image: '/projects/building.jpg',
    url: ''
  },
  {
    title: 'Fleet Safety',
    client: 'Transport Logistics',
    category: 'Gamified Compliance',
    tags: ['TypeScript', 'React Native', 'Gamification'],
    image: '/projects/safety-demo.jpg',
    url: ''
  },
  {
    title: 'SuggestBabyName Mobile',
    client: 'Consumer App',
    category: 'Native Mobile App',
    tags: ['Swift', 'Capacitor 6', 'iOS', 'Android'],
    image: '/projects/baby-name-mobile.jpg',
    url: ''
  },
  {
    title: 'The Law Dashboard',
    client: 'LegalTech',
    category: 'Case Management',
    tags: ['TypeScript', 'React', 'SaaS', 'Legal'],
    image: '/projects/the-law.jpg',
    url: ''
  }
];

export default function Projects() {
  const headingRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) observer.observe(headingRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container">
        <div 
          className={`projects-header fade-up-init ${visible ? 'fade-up-active' : ''}`}
          ref={headingRef}
        >
          <span className="text-mono">// OUR WORK</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projectsList.map((project, index) => {
            const CardWrapper = project.url ? 'a' : 'div';
            return (
              <CardWrapper
                key={index} 
                href={project.url || undefined}
                target={project.url ? '_blank' : undefined}
                rel={project.url ? 'noreferrer' : undefined}
                className={`project-card fade-up-init ${visible ? 'fade-up-active' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
              {/* Project Card Graphic / Mockup background */}
              <div className="project-graphic">
                {project.image && (
                  <img src={project.image} alt={project.title} className="project-image" />
                )}
                <div className="project-graphic-content">
                  <span className="project-client">{project.client}</span>
                  <div className="project-overlay">
                    <span className="project-category-pill">{project.category}</span>
                  </div>
                </div>
              </div>

              {/* Project Card Text */}
              <div className="project-info">
                <h3 className="project-name">
                  {project.title}
                  {project.url && <ArrowUpRight size={18} className="project-link-icon" />}
                </h3>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
