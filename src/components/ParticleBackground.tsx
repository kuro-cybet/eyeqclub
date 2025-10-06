import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  mousePosition: { x: number; y: number };
}

function NetworkParticles({ mousePosition }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const count = 150;
  const maxDistance = 4;
  
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distributed particles in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      // Blue/cyan color scheme like the reference
      const color = new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    
    // Update particle positions with mouse influence
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply velocities
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Mouse influence
      positions[i3] += mousePosition.x * 0.01;
      positions[i3 + 1] += mousePosition.y * 0.01;
      
      // Boundary wrapping
      if (Math.abs(positions[i3]) > 20) velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > 20) velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > 15) velocities[i3 + 2] *= -1;
    }
    
    // Create connections between nearby particles
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < maxDistance) {
          // Add line
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
          
          // Line opacity based on distance
          const alpha = 1 - (distance / maxDistance);
          const color = new THREE.Color().setHSL(0.55, 0.8, 0.6);
          lineColors.push(color.r, color.g, color.b, alpha);
          lineColors.push(color.r, color.g, color.b, alpha);
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update lines
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
    linesRef.current.geometry.dispose();
    linesRef.current.geometry = lineGeometry;
    
    // Gentle rotation
    if (pointsRef.current.parent) {
      pointsRef.current.parent.rotation.y += 0.0005;
    }
  });

  return (
    <group>
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
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

const ParticleBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  return (
    <div 
      className="fixed inset-0 -z-10"
      onMouseMove={handleMouseMove}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      
      {/* 3D Network particles */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
        className="absolute inset-0"
      >
        <NetworkParticles mousePosition={mousePosition} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
