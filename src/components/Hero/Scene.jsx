import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DataWaves({ reducedMotion }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  
  // Store exact mouse position in local plane coordinates
  const mousePos = useRef(new THREE.Vector3(999, 999, 0));
  const targetMousePos = useRef(new THREE.Vector3(999, 999, 0));

  // Dense geometry for smooth ripples
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(50, 40, 100, 80), []);

  useFrame((state, delta) => {
    if (!reducedMotion && pointsRef.current) {
      const time = state.clock.getElapsedTime() * 0.3;
      const positions = pointsRef.current.geometry.attributes.position;
      
      // Smoothly interpolate current effect position to target mouse position
      mousePos.current.lerp(targetMousePos.current, 0.15);

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Base flowing waves (toned down for a calmer sea)
        const wave1 = Math.sin(x * 0.15 + time) * 0.8;
        const wave2 = Math.cos(y * 0.15 + time * 0.7) * 0.8;
        const wave3 = Math.sin((x + y) * 0.1 - time * 0.4) * 0.5;
        let finalZ = wave1 + wave2 + wave3;
        
        // Exact mouse reaction
        const dx = x - mousePos.current.x;
        const dy = y - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 4.5; // Radius of the mouse effect
        if (dist < maxDist) {
          // Calculate intensity (1 at center, 0 at edges)
          const intensity = 1 - (dist / maxDist);
          // Push dots DOWN (away) as requested, easing out gracefully
          const pushDown = Math.sin(intensity * Math.PI / 2) * 3.5; 
          finalZ -= pushDown;
        }
        
        positions.setZ(i, finalZ);
      }
      positions.needsUpdate = true;
    }
    
    if (groupRef.current && !reducedMotion) {
      // Much more subtle parallax so it's not "too much"
      const targetRotationX = (state.pointer.y * Math.PI) * 0.02 - (Math.PI / 2) + 0.25; 
      const targetRotationY = (state.pointer.x * Math.PI) * 0.02;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  // Track the mouse exactly over the invisible plane
  const handlePointerMove = (e) => {
    if (e.intersections.length > 0) {
      // Convert the world hit point exactly to the group's local space
      if (groupRef.current) {
        const localPoint = groupRef.current.worldToLocal(e.intersections[0].point.clone());
        targetMousePos.current.copy(localPoint);
      }
    }
  };

  const handlePointerOut = () => {
    // Move the interaction point far away so dots spring back naturally
    targetMousePos.current.set(999, 999, 0);
  };

  return (
    // Lowered Y and relaxed pitch so it's a calmer background
    <group ref={groupRef} position={[0, -3.5, -8]} rotation={[-Math.PI / 2 + 0.25, 0, 0]}>
      
      {/* Invisible plane solely for precise, smooth mouse raycasting */}
      <mesh 
        visible={false} 
        onPointerMove={handlePointerMove} 
        onPointerOut={handlePointerOut} 
        onPointerLeave={handlePointerOut}
      >
        <planeGeometry args={[50, 40]} />
      </mesh>
      
      <points ref={pointsRef} geometry={planeGeo}>
        <pointsMaterial 
          size={0.06} 
          color="#5E6AD2" 
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <mesh geometry={planeGeo}>
        <meshBasicMaterial 
          color="#8B5CF6" 
          wireframe 
          transparent 
          opacity={0.05} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <fog attach="fog" args={['#050506', 5, 22]} />
      <DataWaves reducedMotion={reducedMotion} />
    </>
  );
}
