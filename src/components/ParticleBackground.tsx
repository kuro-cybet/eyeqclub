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
      // Create vertical data streams
      const x = (Math.random() - 0.5) * 30;
      const y = Math.random() * 20 - 10;
      const z = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Data stream colors - cyan, green, blue (Matrix/cyberpunk theme)
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.5) {
        // Cyan/Electric blue
        color = new THREE.Color().setHSL(0.5, 1, 0.6 + Math.random() * 0.2);
      } else if (colorChoice < 0.8) {
        // Matrix green
        color = new THREE.Color().setHSL(0.33, 1, 0.5 + Math.random() * 0.3);
      } else {
        // Bright blue
        color = new THREE.Color().setHSL(0.6, 1, 0.6 + Math.random() * 0.2);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      speeds[i] = Math.random() * 0.5 + 0.3;
    }
    
    return { positions, colors, speeds };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Data stream falling effect
      positions[i3 + 1] -= speeds[i] * 0.05;
      
      // Add slight horizontal drift with mouse influence
      const mouseInfluenceX = mousePosition.x * 0.3;
      positions[i3] += Math.sin(time + i * 0.1) * 0.01 + mouseInfluenceX * 0.01;
      
      // Reset particles that fall too low
      if (positions[i3 + 1] < -10) {
        positions[i3 + 1] = 10;
        positions[i3] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Subtle rotation for depth
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
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
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
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
