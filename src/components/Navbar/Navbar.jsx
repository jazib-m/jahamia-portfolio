import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section intersection detection
      const sections = ['hero', 'about', 'services', 'projects', 'process', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="logo" onClick={closeMenu}>
          JAHAMIA<span className="accent-text">TECH</span>
        </a>

        {/* Desktop Menu */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
          <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
          <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <a href="#about" className="mobile-nav-link" onClick={closeMenu}>About</a>
          <a href="#services" className="mobile-nav-link" onClick={closeMenu}>Services</a>
          <a href="#projects" className="mobile-nav-link" onClick={closeMenu}>Projects</a>
          <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
