import { useEffect, useRef, useState } from 'react';
import './Process.css';

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Research',
    description: 'We audit your objectives, map stakeholders, and outline high-level technical parameters. This mitigates assumptions and sets clear execution boundaries.'
  },
  {
    step: '02',
    title: 'Strategy & Architecture',
    description: 'We draft the technical specs, select appropriate databases and frameworks, and design the database schemas. A solid roadmap guarantees stable development.'
  },
  {
    step: '03',
    title: 'Design & Interaction',
    description: 'Our design system shapes clean user interfaces, emphasizing modern glassmorphism details, high-contrast readability, and micro-animations for high engagement.'
  },
  {
    step: '04',
    title: 'Agile Implementation',
    description: 'Our senior developers write clean, modular code. We perform constant testing iterations and build stable CI/CD pipelines to deliver incremental builds.'
  },
  {
    step: '05',
    title: 'Launch & Integration',
    description: 'We deploy workloads onto secure cloud configurations or edge delivery networks (like Cloudflare Pages), mapping custom DNS and confirming uptime.'
  },
  {
    step: '06',
    title: 'Support & Analytics',
    description: 'Post-launch optimization involves continuous telemetry monitoring, resolving performance issues, and updating features as your business expands.'
  }
];

export default function Process() {
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
    <section id="process" className="section-padding process-section">
      <div className="container">
        <div 
          className={`process-header fade-up-init ${visible ? 'fade-up-active' : ''}`}
          ref={headingRef}
        >
          <span className="text-mono">// HOW WE WORK</span>
          <h2 className="section-title">Our Development Process</h2>
        </div>

        <div className="process-timeline">
          {/* Vertical Line */}
          <div className="timeline-line" />

          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className={`timeline-step fade-up-init ${visible ? 'fade-up-active' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className="timeline-dot">
                <span className="dot-number font-mono">{step.step}</span>
              </div>

              {/* Timeline content */}
              <div className="glass timeline-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
