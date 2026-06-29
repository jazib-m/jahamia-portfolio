import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Defined coordinate grid targets to form the letter "J" (Jahamia)
const legoTargets = [
  // Top bar of J (y = 1.6, block height is 0.4)
  { tx: -1.2, ty: 1.6, tz: 0, color: '#5E6AD2', w: 0.8 }, // Indigo
  { tx: -0.4, ty: 1.6, tz: 0, color: '#5E6AD2', w: 0.8 },
  { tx: 0.4, ty: 1.6, tz: 0, color: '#8B5CF6', w: 0.8 },  // Purple
  { tx: 1.2, ty: 1.6, tz: 0, color: '#8B5CF6', w: 0.8 },
  
  // Vertical stem of J
  { tx: 0.4, ty: 1.2, tz: 0, color: '#3b82f6', w: 0.8 },  // Blue
  { tx: 0.4, ty: 0.8, tz: 0, color: '#3b82f6', w: 0.8 },
  { tx: 0.4, ty: 0.4, tz: 0, color: '#06b6d4', w: 0.8 },  // Cyan
  { tx: 0.4, ty: 0.0, tz: 0, color: '#06b6d4', w: 0.8 },
  { tx: 0.4, ty: -0.4, tz: 0, color: '#10b981', w: 0.8 }, // Green
  { tx: 0.4, ty: -0.8, tz: 0, color: '#10b981', w: 0.8 },
  { tx: 0.4, ty: -1.2, tz: 0, color: '#eab308', w: 0.8 }, // Yellow
  { tx: 0.4, ty: -1.6, tz: 0, color: '#eab308', w: 0.8 },
  
  // Bottom loop of J curving left and up
  { tx: -0.4, ty: -2.0, tz: 0, color: '#f97316', w: 0.8 }, // Orange
  { tx: -1.2, ty: -1.6, tz: 0, color: '#ef4444', w: 0.8 }, // Red
  { tx: -1.2, ty: -1.0, tz: 0, color: '#ec4899', w: 0.8 }  // Pink
];

function LegoBrick({ target, delayIndex, time, reducedMotion }) {
  const meshGroup = useRef();
  
  // Initialize random start state high up
  const startState = useMemo(() => {
    return {
      x: target.tx + (Math.random() - 0.5) * 5,
      y: 8 + Math.random() * 4,
      z: target.tz + (Math.random() - 0.5) * 4,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2
    };
  }, [target]);

  useFrame(() => {
    if (!meshGroup.current) return;

    if (reducedMotion) {
      // Just snap immediately in place
      meshGroup.current.position.set(target.tx, target.ty, target.tz);
      meshGroup.current.rotation.set(0, 0, 0);
      return;
    }

    // Drop phase logic
    const startDelay = delayIndex * 0.15; // Staggered start times
    const duration = 1.5; // Seconds to fall and land
    
    if (time < startDelay) {
      // Keep block hidden high up/static before drop
      meshGroup.current.position.set(startState.x, startState.y, startState.z);
      meshGroup.current.rotation.set(startState.rx, startState.ry, startState.rz);
      meshGroup.current.visible = false;
      return;
    }

    meshGroup.current.visible = true;
    const progress = Math.min((time - startDelay) / duration, 1);

    // Easing: bounce/spring effect at the end
    let easeProgress = progress;
    if (progress < 1) {
      // Easing curve mimicking gravitational fall + bounce landing
      easeProgress = 1 - Math.cos((progress * Math.PI) / 2);
    }

    // Interpolate positions
    const x = THREE.MathUtils.lerp(startState.x, target.tx, easeProgress);
    const y = THREE.MathUtils.lerp(startState.y, target.ty, easeProgress);
    const z = THREE.MathUtils.lerp(startState.z, target.tz, easeProgress);

    // Interpolate rotations to 0 (aligned brick)
    const rx = THREE.MathUtils.lerp(startState.rx, 0, easeProgress);
    const ry = THREE.MathUtils.lerp(startState.ry, 0, easeProgress);
    const rz = THREE.MathUtils.lerp(startState.rz, 0, easeProgress);

    meshGroup.current.position.set(x, y, z);
    meshGroup.current.rotation.set(rx, ry, rz);
  });

  const brickHeight = 0.35;
  const brickWidth = target.w || 0.8;
  const brickDepth = 0.8;

  return (
    <group ref={meshGroup}>
      {/* Main Box Brick */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[brickWidth, brickHeight, brickDepth]} />
        <meshStandardMaterial 
          color={target.color} 
          roughness={0.2} 
          metalness={0.1}
          clearcoat={0.6}
        />
      </mesh>

      {/* Studs on top of Lego block */}
      <mesh position={[-0.2, brickHeight / 2 + 0.04, -0.2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
        <meshStandardMaterial color={target.color} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, brickHeight / 2 + 0.04, -0.2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
        <meshStandardMaterial color={target.color} roughness={0.2} />
      </mesh>
      <mesh position={[-0.2, brickHeight / 2 + 0.04, 0.2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
        <meshStandardMaterial color={target.color} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, brickHeight / 2 + 0.04, 0.2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
        <meshStandardMaterial color={target.color} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Scene() {
  const [time, setTime] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerGroupRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useFrame((state, delta) => {
    if (!reducedMotion) {
      setTime((prev) => {
        // Reset cycle loop after 9 seconds (drop finishes around 4s, holds for 5s)
        if (prev > 9) {
          return 0;
        }
        return prev + delta;
      });

      // Slowly rotate the entire assembled "J" logo structure
      if (containerGroupRef.current) {
        containerGroupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
      }
    }
  });

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-6, -6, 6]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[6, -6, -6]} intensity={0.5} color="#22d3ee" />

      {/* Assembly Container */}
      <group ref={containerGroupRef} position={[1.4, 0.2, 0]}>
        {legoTargets.map((target, index) => (
          <LegoBrick 
            key={index} 
            target={target} 
            delayIndex={index} 
            time={time}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </>
  );
}
