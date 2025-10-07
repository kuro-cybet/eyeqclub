import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from "postprocessing";
import "./Hyperspeed.css";

const Hyperspeed = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 100);
    
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, -100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Road base
    const roadWidth = 10;
    const roadLength = 400;
    const geometry = new THREE.PlaneGeometry(roadWidth, roadLength, 10, 10);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.8,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const road = new THREE.Mesh(geometry, material);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -roadLength / 4;
    scene.add(road);

    // Light poles with glow
    const lightGeometry = new THREE.BoxGeometry(0.3, 3, 0.3);
    const lights: THREE.Mesh[] = [];
    
    for (let i = 0; i < 120; i++) {
      const left = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial());
      const right = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial());
      
      const z = -i * 3 - Math.random() * 50;
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 1, 0.5);
      
      (left.material as THREE.MeshBasicMaterial).color = color;
      (right.material as THREE.MeshBasicMaterial).color = color;
      
      left.position.set(-roadWidth / 2 - 2, 1.5, z);
      right.position.set(roadWidth / 2 + 2, 1.5, z);
      
      // Add point lights for glow
      const glowLeft = new THREE.PointLight(color, 2, 10);
      const glowRight = new THREE.PointLight(color, 2, 10);
      glowLeft.position.copy(left.position);
      glowRight.position.copy(right.position);
      
      scene.add(left, right, glowLeft, glowRight);
      lights.push(left, right);
    }

    // Bloom effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloom = new BloomEffect({ intensity: 1.5 });
    const effectPass = new EffectPass(camera, bloom);
    effectPass.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(effectPass);

    // Animation loop
    const speed = 4;
    const animate = () => {
      requestAnimationFrame(animate);
      
      lights.forEach((light) => {
        light.position.z += speed;
        if (light.position.z > camera.position.z + 20) {
          light.position.z = -300;
        }
      });
      
      composer.render();
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div id="Lights" ref={mountRef}></div>;
};

export default Hyperspeed;
