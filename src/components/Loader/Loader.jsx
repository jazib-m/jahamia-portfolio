import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment progress faster/slower randomly
        const next = prev + Math.floor(Math.random() * 8) + 2;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const fadeTimeout = setTimeout(() => {
        setFadeOut(true);
      }, 500); // Wait 500ms after reaching 100%

      const completeTimeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1100); // 500ms wait + 600ms transition time

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [percent, onComplete]);

  const word1 = "JAHAMIA";
  const word2 = "TECH";

  return (
    <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="brand-text">
          <div className="title-row">
            {word1.split('').map((char, index) => (
              <span 
                key={`w1-${index}`} 
                style={{ animationDelay: `${index * 0.05}s` }}
                className="loader-char"
              >
                {char}
              </span>
            ))}
            <span className="space">&nbsp;</span>
            {word2.split('').map((char, index) => (
              <span 
                key={`w2-${index}`} 
                style={{ animationDelay: `${(word1.length + index) * 0.05}s` }}
                className="loader-char accent-char"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="subtitle-row">
            <span className="loader-subtitle" style={{ animationDelay: '0.6s' }}>
              CREATIVE TECHNOLOGY LAB
            </span>
          </div>
        </div>

        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${percent}%` }}
          />
          <div className="progress-text font-mono">
            {String(percent).padStart(3, '0')}%
          </div>
        </div>
      </div>
    </div>
  );
}
