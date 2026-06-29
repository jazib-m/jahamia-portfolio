import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* 3D Canvas Background */}
      <div className="canvas-container" aria-hidden="true">
        <Suspense fallback={<div className="canvas-fallback" />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ pointerEvents: 'none' }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Main Text Content */}
      <div className="container hero-container">
        <div className="hero-content">
          <span className="text-mono hero-mono">
            // DESIGN & TECHNOLOGY STUDIO
          </span>
          <h1 className="hero-title">
            We Build The <br />
            <span className="gradient-text">Future of Tech</span>
          </h1>
          <p className="hero-description">
            Jahamia Tech is a premium software agency specializing in AI/ML solutions, web & mobile applications, and scalable SaaS systems.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Let's Talk <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About Section">
        <span className="scroll-text font-mono">SCROLL DOWN</span>
        <div className="scroll-icon-wrap">
          <ArrowDown size={14} className="bouncing-arrow" />
        </div>
      </a>
    </section>
  );
}
