import { useEffect, useRef } from "react";
import * as THREE from "three";

type PlexusBackgroundProps = {
  particleCount?: number;
  maxDistance?: number;
  nodeColor?: number;
  lineColor?: number;
};

const PlexusBackground = ({
  particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 180 : 300,
  maxDistance = 80,
  nodeColor = 0xffffff,
  lineColor = 0xaaaaaa,
}: PlexusBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId = 0;
    let isDisposed = false;

    // Scene and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles (nodes)
    const particlesMaterial = new THREE.PointsMaterial({
      color: nodeColor,
      size: 2.5,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 500;
      positions[i3 + 1] = (Math.random() - 0.5) * 500;
      positions[i3 + 2] = (Math.random() - 0.5) * 500;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particles = new THREE.Points(particlesGeometry, particlesMaterial) as THREE.Points & {
      velocities?: Float32Array;
    };

    // Velocities per particle (x,y,z)
    const velocities = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      velocities[i3] = (Math.random() - 0.5) * 0.2;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    particles.velocities = velocities;
    scene.add(particles);

    // Lines (connections)
    const linesMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.3,
    });
    const linesGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const pos = particles.geometry.attributes.position.array as Float32Array;
      const v = velocities;
      const linePositions: number[] = [];

      // Update particle positions and bounce in a cube boundary
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += v[i3];
        pos[i3 + 1] += v[i3 + 1];
        pos[i3 + 2] += v[i3 + 2];

        if (pos[i3] > 250 || pos[i3] < -250) v[i3] *= -1;
        if (pos[i3 + 1] > 250 || pos[i3 + 1] < -250) v[i3 + 1] *= -1;
        if (pos[i3 + 2] > 250 || pos[i3 + 2] < -250) v[i3 + 2] *= -1;

        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dz = pos[i3 + 2] - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < maxDistance) {
            linePositions.push(pos[i3], pos[i3 + 1], pos[i3 + 2]);
            linePositions.push(pos[j3], pos[j3 + 1], pos[j3 + 2]);
          }
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      lines.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // Parallax camera motion
      camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);

      // Dispose Three objects
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, [lineColor, maxDistance, nodeColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "#0a0a0a",
        pointerEvents: "none",
      }}
    />
  );
};

export default PlexusBackground;
