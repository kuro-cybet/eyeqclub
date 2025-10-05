import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  mousePosition: { x: number; y: number };
}

function RadialParticles({ mousePosition }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Create particles radiating from center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15;
      const height = (Math.random() - 0.5) * 8;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Rainbow colors - brighter
      const hue = (angle / (Math.PI * 2)) + Math.random() * 0.1;
      const color = new THREE.Color().setHSL(hue, 1, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      speeds[i] = Math.random() * 0.5 + 0.5;
    }
    
    return { positions, colors, speeds };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get angle and current radius
      const x = positions[i3];
      const z = positions[i3 + 2];
      const angle = Math.atan2(z, x);
      let radius = Math.sqrt(x * x + z * z);
      
      // Radiate outward
      radius += speeds[i] * 0.02;
      
      // Reset if too far
      if (radius > 15) {
        radius = 0.5;
      }
      
      // Update position with mouse influence
      const mouseInfluenceX = mousePosition.x * 0.5;
      const mouseInfluenceY = mousePosition.y * 0.5;
      
      positions[i3] = Math.cos(angle + mouseInfluenceX * 0.01) * radius;
      positions[i3 + 2] = Math.sin(angle + mouseInfluenceX * 0.01) * radius;
      positions[i3 + 1] += Math.sin(time * 0.5 + i * 0.01) * 0.005 + mouseInfluenceY * 0.005;
      
      // Keep height in bounds
      if (Math.abs(positions[i3 + 1]) > 4) {
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <div 
      className="fixed inset-0 -z-10 bg-black"
      onMouseMove={handleMouseMove as any}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'black' }}
      >
        <RadialParticles mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
