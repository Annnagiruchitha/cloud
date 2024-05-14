// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const ThreeViewer = ({ modelUrl, scale }) => {
//   const containerRef = useRef();

//   useEffect(() => {
//     let scene, camera, renderer, controls;

//     const init = () => {
//       // Scene
//       scene = new THREE.Scene();

//       // Camera
//       camera = new THREE.PerspectiveCamera(75, containerRef.current.offsetWidth / containerRef.current.offsetHeight, 0.1, 1000);
//       camera.position.z = 5;

//       // Renderer
//       renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
//       containerRef.current.appendChild(renderer.domElement);

//       // Controls
//       controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.25;
//       controls.enableZoom = true;

//       // Load Model
//       const loader = new GLTFLoader();
//       loader.load(modelUrl, (gltf) => {
//         const model = gltf.scene;
//         model.scale.set(scale, scale, scale);
//         scene.add(model);
//       });

//       // Light
//       const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//       scene.add(ambientLight);

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//       directionalLight.position.set(5, 5, 5);
//       scene.add(directionalLight);

//       // Animation Loop
//       const animate = () => {
//         requestAnimationFrame(animate);

//         // Update animations or controls here
//         controls.update();

//         renderer.render(scene, camera);
//       };

//       animate();
//     };

//     init();

//     // Clean-up
//     return () => {
//       if (renderer) {
//         renderer.dispose();
//       }
//     };
//   }, [modelUrl, scale]);

//   return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default ThreeViewer;
