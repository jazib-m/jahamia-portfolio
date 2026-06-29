import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonialsList = [
  {
    quote: "Jahamia Tech delivered our AI engine ahead of schedule. The code was exceptionally clean and modular, allowing our team to integrate it instantly. A top-tier tech agency.",
    author: "Sarah Jenkins",
    company: "CTO, TechCorp Solutions",
    stars: 5
  },
  {
    quote: "Working with them was a game-changer for our SaaS dashboard. The interface is stunning and the Three.js details really impress our users. Highly recommended.",
    author: "Marcus Chen",
    company: "Founder, RetailFlow Global",
    stars: 5
  },
  {
    quote: "Their DevOps expertise migrated our legacy infrastructure into Cloudflare Workers and AWS with zero downtime. Uptime has been solid ever since.",
    author: "Elena Rostova",
    company: "VP Engineering, MediTrack Systems",
    stars: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const autoPlayRef = useRef();

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

  // Setup auto-rotation
  useEffect(() => {
    autoPlayRef.current = nextTestimonial;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const interval = setInterval(play, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="section-padding testimonials-section">
      <div className="container" ref={containerRef}>
        <div className={`testimonials-header fade-up-init ${visible ? 'fade-up-active' : ''}`}>
          <span className="text-mono">// CLIENT VOICES</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        <div className={`testimonials-slider fade-up-init ${visible ? 'fade-up-active' : ''}`} style={{ transitionDelay: '150ms' }}>
          <div className="glass testimonial-card">
            {/* Stars row */}
            <div className="stars-row" aria-label={`Rated ${testimonialsList[activeIndex].stars} out of 5 stars`}>
              {Array.from({ length: testimonialsList[activeIndex].stars }).map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="testimonial-quote">
              "{testimonialsList[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="testimonial-author">
              <span className="author-name">{testimonialsList[activeIndex].author}</span>
              <span className="author-company">{testimonialsList[activeIndex].company}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="slider-controls">
            <button 
              className="control-btn" 
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="slider-dots">
              {testimonialsList.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button 
              className="control-btn" 
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
