import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const orbRef = useRef();
  const particlesRef = useRef();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Generate particles points
  const particleCount = 180;
  const particlesData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scale = 2.5;

    for (let i = 0; i < particleCount; i++) {
      // Golden ratio/Spherical fibonacci lattice distribution for even spread
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = 1.2 + Math.random() * 0.8; // Random radius between 1.2 and 2.0

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * scale;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * scale;
      positions[i * 3 + 2] = r * Math.cos(phi) * scale;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Slow rotation for orb
      if (orbRef.current) {
        orbRef.current.rotation.y = time * 0.08;
        orbRef.current.rotation.x = time * 0.05;
      }
      
      // Rotational drift for particle cloud
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.02;
        particlesRef.current.rotation.z = time * 0.01;
      }
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-8, -8, -8]} intensity={1.0} color="#8b5cf6" />
      <pointLight position={[0, -5, 5]} intensity={1.2} color="#22d3ee" />

      {/* Hero Central Orb */}
      <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={orbRef} position={[1.2, 0, 0]}>
          <icosahedronGeometry args={[1.5, 32]} />
          <MeshDistortMaterial
            color="#5e6ad2"
            distort={reducedMotion ? 0 : 0.35}
            speed={reducedMotion ? 0 : 1.2}
            roughness={0.2}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            emissive="#3b0764"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Floating Particle Network */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlesData}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#8b5cf6"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
