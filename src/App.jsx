import { useState } from 'react';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Stats from './components/Stats/Stats';
import Process from './components/Process/Process';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Intro Loader Screen */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Main Content (Revealed after loading completes) */}
      {!loading && (
        <div className="app-content-wrapper fade-in-section">
          {/* Global Ambient Glows & Grain overlays */}
          <div className="ambient-glows">
            <div className="ambient-blob ambient-blob-1" />
            <div className="ambient-blob ambient-blob-2" />
            <div className="ambient-blob ambient-blob-3" />
          </div>
          <div className="grain" />

          {/* Site Sections */}
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Projects />
          <Stats />
          <Process />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
