import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 300;
const MAX_DISTANCE = 80; // in world units matching positions below
const WORLD_BOUNDS = 250; // particles bounce within [-WORLD_BOUNDS, WORLD_BOUNDS]

const PlexusBackground = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationFrameId = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1);
    mount.appendChild(renderer.domElement);

    // Particles (points)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.5,
      transparent: true,
      opacity: 0.8,
    });
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * (WORLD_BOUNDS * 2);
      positions[i3 + 1] = (Math.random() - 0.5) * (WORLD_BOUNDS * 2);
      positions[i3 + 2] = (Math.random() - 0.5) * (WORLD_BOUNDS * 2);
    }
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const points = new THREE.Points(pointsGeometry, pointsMaterial) as THREE.Points & {
      velocities?: THREE.Vector3[];
    };

    // Velocities
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      );
    }
    points.velocities = velocities;

    scene.add(points);

    // Lines (connections)
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.3,
    });
    let linesGeometry = new THREE.BufferGeometry();
    let lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Interaction state
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
    document.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posArray = points.geometry.attributes.position
        .array as Float32Array;
      const linePositions: number[] = [];

      // Move particles and bounce within bounds
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const v = velocities[i];

        posArray[i3] += v.x;
        posArray[i3 + 1] += v.y;
        posArray[i3 + 2] += v.z;

        if (posArray[i3] > WORLD_BOUNDS || posArray[i3] < -WORLD_BOUNDS) v.x *= -1;
        if (posArray[i3 + 1] > WORLD_BOUNDS || posArray[i3 + 1] < -WORLD_BOUNDS) v.y *= -1;
        if (posArray[i3 + 2] > WORLD_BOUNDS || posArray[i3 + 2] < -WORLD_BOUNDS) v.z *= -1;

        // Connect nearby particles
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < MAX_DISTANCE) {
            linePositions.push(
              posArray[i3],
              posArray[i3 + 1],
              posArray[i3 + 2],
              posArray[j3],
              posArray[j3 + 1],
              posArray[j3 + 2]
            );
          }
        }
      }

      points.geometry.attributes.position.needsUpdate = true;

      // Update lines geometry (dispose previous attributes to avoid leaks)
      linesGeometry.dispose();
      linesGeometry = new THREE.BufferGeometry();
      if (linePositions.length > 0) {
        linesGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(linePositions, 3)
        );
      }
      lines.geometry = linesGeometry;

      // Camera parallax to mouse
      camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);

      // Clean up Three resources
      pointsGeometry.dispose();
      linesGeometry.dispose();
      pointsMaterial.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="fixed inset-0 -z-10" ref={mountRef} />;
};

export default PlexusBackground;
