import { useEffect, useRef, useState } from 'react';
import './About.css';

function StatCard({ targetNum, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Number counting logic
          let start = 0;
          const end = parseInt(targetNum, 10);
          if (isNaN(end)) {
            setCount(targetNum);
            return;
          }
          
          const duration = 2000; // 2 seconds
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [targetNum, hasAnimated]);

  return (
    <div ref={cardRef} className="glass stat-card">
      <div className="stat-number">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const headingRef = useRef(null);
  const textRef = useRef(null);
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
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className={`about-header fade-up-init ${visible ? 'fade-up-active' : ''}`} ref={headingRef}>
          <span className="text-mono">// WHO WE ARE</span>
          <h2 className="section-title">Engineering Digital Excellence</h2>
        </div>
        
        <div className="about-grid">
          {/* Left: Text Info */}
          <div className={`about-text fade-up-init ${visible ? 'fade-up-active' : ''}`} ref={textRef}>
            <p className="lead-paragraph">
              We are a team of expert engineers, designers, and strategists driven to solve complex challenges. We bridge the gap between creative vision and robust technology.
            </p>
            <p>
              At <strong className="highlight-text">Jahamia Tech</strong>, we build state-of-the-art applications using <strong className="highlight-text">Artificial Intelligence</strong>, machine learning, and cutting-edge web frameworks. Our work is fast, performant, and premium — ensuring your business stands out globally.
            </p>
            <p>
              From startup Minimum Viable Products to enterprise digital transformations, we develop custom solutions built to scale seamlessly.
            </p>
          </div>

          {/* Right: Stats Counter Grid */}
          <div className="about-stats">
            <StatCard targetNum="150" suffix="+" label="Projects Delivered" />
            <StatCard targetNum="50" suffix="+" label="Happy Clients" />
            <StatCard targetNum="8" suffix="+" label="Years Experience" />
            <StatCard targetNum="25" suffix="+" label="Team Members" />
          </div>
        </div>
      </div>
    </section>
  );
}
