import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

const projectsList = [
  {
    title: 'AI Analytics Dashboard',
    client: 'TechCorp Solutions',
    category: 'AI & Data Science',
    tags: ['Python', 'React', 'FastAPI', 'TensorFlow'],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
  },
  {
    title: 'E-Commerce Engine',
    client: 'RetailFlow Global',
    category: 'SaaS Platforms',
    tags: ['Next.js', 'PostgreSQL', 'GraphQL', 'Stripe'],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
  },
  {
    title: 'Wearable Sync App',
    client: 'MediTrack Systems',
    category: 'Mobile Application',
    tags: ['React Native', 'Node.js', 'WebSockets', 'Bluetooth'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
  },
  {
    title: 'Cloud Optimization Toolkit',
    client: 'InfraFlow Technologies',
    category: 'DevOps & Systems',
    tags: ['Go', 'Kubernetes', 'AWS', 'Terraform'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)'
  },
  {
    title: 'Decentralized Finance Portal',
    client: 'PaySwift Network',
    category: 'Web3 & Fintech',
    tags: ['TypeScript', 'Solidity', 'Ethers.js', 'Vite'],
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)'
  },
  {
    title: 'Smart Automation Panel',
    client: 'AutomateX Labs',
    category: 'IoT & Systems',
    tags: ['C++', 'React', 'MQTT', 'Docker'],
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)'
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
          {projectsList.map((project, index) => (
            <div 
              key={index} 
              className={`project-card fade-up-init ${visible ? 'fade-up-active' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Card Graphic / Mockup background */}
              <div className="project-graphic" style={{ background: project.gradient }}>
                <span className="project-client">{project.client}</span>
                <div className="project-overlay">
                  <span className="project-category-pill">{project.category}</span>
                </div>
              </div>

              {/* Project Card Text */}
              <div className="project-info">
                <h3 className="project-name">
                  {project.title}
                  <ArrowUpRight size={18} className="project-link-icon" />
                </h3>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
