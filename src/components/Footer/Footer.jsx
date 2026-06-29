import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Brand Col */}
          <div className="footer-brand">
            <div className="footer-logo">
              JAHAMIA<span className="accent-text">TECH</span>
            </div>
            <p className="footer-tagline">
              Engineering digital solutions for the next generation of business.
            </p>
          </div>

          {/* Links Col */}
          <nav className="footer-nav" aria-label="Footer Navigation">
            <a href="#about" className="footer-link">About</a>
            <a href="#services" className="footer-link">Services</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#contact" className="footer-link">Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright font-mono">
            &copy; {new Date().getFullYear()} JAHAMIA TECH. ALL RIGHTS RESERVED.
          </p>
          
          <button 
            className="back-to-top font-mono" 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            BACK TO TOP <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
