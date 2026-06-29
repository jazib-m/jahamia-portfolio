import { useEffect, useRef, useState } from 'react';
import './Stats.css';

const statsData = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '1.2M+', label: 'Lines of Code' },
  { value: '3x', label: 'Faster Deployments' },
  { value: '24/7', label: 'Systems Monitoring' }
];

export default function Stats() {
  const sectionRef = useRef(null);
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="container stats-container">
        <div className="stats-row">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-item fade-up-init ${visible ? 'fade-up-active' : ''}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="stat-value gradient-text">{stat.value}</span>
              <span className="stat-item-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
