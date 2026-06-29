import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const mainCursorRef = useRef(null);
  const secondaryCursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Detect clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouchDevice]);

  // Interpolation for secondary cursor delay
  const secondaryCursorPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (isTouchDevice || isHidden) return;

    let animationFrameId;
    
    const updatePosition = () => {
      const targetX = position.x;
      const targetY = position.y;
      
      // Lerp logic: current = current + (target - current) * factor
      secondaryCursorPos.current.x += (targetX - secondaryCursorPos.current.x) * 0.15;
      secondaryCursorPos.current.y += (targetY - secondaryCursorPos.current.y) * 0.15;
      
      if (secondaryCursorRef.current) {
        secondaryCursorRef.current.style.transform = `translate3d(${secondaryCursorPos.current.x}px, ${secondaryCursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isHidden, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={mainCursorRef}
        className={`custom-cursor-dot ${isHidden ? 'hidden' : ''} ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      <div
        ref={secondaryCursorRef}
        className={`custom-cursor-circle ${isHidden ? 'hidden' : ''} ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
}
