import { useState, useRef, useEffect } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

// Custom inline SVG icons for brands to ensure building works regardless of lucide-react version
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Simulate submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div 
          className={`contact-header fade-up-init ${visible ? 'fade-up-active' : ''}`}
          ref={headingRef}
        >
          <span className="text-mono">// GET IN TOUCH</span>
          <h2 className="section-title">Let's Build Something Great</h2>
        </div>

        <div className="contact-grid">
          {/* Left Column: Info */}
          <div className={`contact-info fade-up-init ${visible ? 'fade-up-active' : ''}`} style={{ transitionDelay: '100ms' }}>
            <p className="contact-lead">
              Have an idea, project, or need technical consulting? We'd love to partner with you. Drop us a line and let's configure the solution.
            </p>

            <div className="contact-details">
              <a href="mailto:hello@jahamiatech.com" className="contact-detail-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <span>hello@jahamiatech.com</span>
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className={`contact-form-container fade-up-init ${visible ? 'fade-up-active' : ''}`} style={{ transitionDelay: '200ms' }}>
            {status === 'success' ? (
              <div className="glass success-state">
                <CheckCircle size={48} className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We will read your coordinates and get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Describe your project guidelines..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'} 
                  className="btn btn-primary submit-btn"
                >
                  {status === 'sending' ? (
                    'Transmitting...'
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
