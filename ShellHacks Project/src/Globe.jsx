import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Globe() {
  // Create a ref for the DOM element
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Append the renderer to the ref's current node
    mountRef.current.appendChild(renderer.domElement);

    // Load the Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/1_earth_16k.jpg");

    // Create a sphere geometry and apply the texture
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    const globe = new THREE.Mesh(geometry, material);

    scene.add(globe);
    camera.position.z = 10;

    // Animate the globe
    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0015; // Rotate the globe
      renderer.render(scene, camera);
    }
    
    animate();

    return () => {
        mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
}

export default Globe;
