import { useEffect, useRef, useState } from 'react';
import { Brain, Globe, Smartphone, Layers, Users, Cloud } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Custom machine learning models, natural language processing, computer vision, and predictive analytics designed to automate operations and drive intelligent insights.'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'High-performance web applications built on modern, secure stacks. Optimised for maximum speed, dynamic interactions, and fluid responsiveness.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Premium native and cross-platform mobile apps for iOS and Android, focusing on seamless user experience, gesture navigation, and robust offline sync.'
  },
  {
    icon: Layers,
    title: 'SaaS Products',
    description: 'Scalable, multi-tenant software-as-a-service application design and development. Multi-threaded backends, secure payments, and custom telemetry.'
  },
  {
    icon: Users,
    title: 'IT Consulting',
    description: 'Expert technology planning and architecture advisory. We evaluate your current pipelines, security posture, and database setups to design systems built for longevity.'
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Cloud orchestration, immutable infrastructure pipelines (IaC), container deployments, automated monitoring, and zero-downtime CI/CD workflows.'
  }
];

export default function Services() {
  const containerRef = useRef(null);
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

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section-padding services-section">
      <div className="container" ref={containerRef}>
        <div className={`services-header fade-up-init ${visible ? 'fade-up-active' : ''}`}>
          <span className="text-mono">// WHAT WE DO</span>
          <h2 className="section-title">Services That Scale Growth</h2>
          <p className="services-subtitle">
            From design to deploy, we offer comprehensive engineering services aligned with your business goals.
          </p>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`glass service-card fade-up-init ${visible ? 'fade-up-active' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="service-icon-wrap">
                  <Icon size={32} strokeWidth={1.5} className="service-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
