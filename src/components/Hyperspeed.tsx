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
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, -50);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(0, 5, 10);
    scene.add(ambient, dir);

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

    // Light poles
    const lightGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
    const lights: THREE.Mesh[] = [];
    for (let i = 0; i < 100; i++) {
      const left = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial());
      const right = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial());
      const z = -Math.random() * roadLength;
      const color = new THREE.Color().setHSL(Math.random(), 1, 0.6);
      (left.material as THREE.MeshBasicMaterial).color = color;
      (right.material as THREE.MeshBasicMaterial).color = color;
      left.position.set(-roadWidth / 2 - 1, 1, z);
      right.position.set(roadWidth / 2 + 1, 1, z);
      scene.add(left, right);
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
    const speed = 3.5;
    const animate = () => {
      requestAnimationFrame(animate);
      lights.forEach((light) => {
        light.position.z += speed;
        if (light.position.z > camera.position.z + 10) {
          light.position.z = -roadLength / 2;
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
