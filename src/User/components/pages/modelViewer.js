// import React, { useState, useEffect, useRef } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
 
// function loadGLTFModel(scene, glbPath, options) {
//   const { receiveShadow, castShadow } = options;
//   return new Promise((resolve, reject) => {
//     const loader = new GLTFLoader();
//     loader.load(
//       glbPath,
//       (gltf) => {
//         const obj = gltf.scene;
//         obj.name = "dinosaur";
//         obj.position.y = 0;
//         obj.position.x = 0;
//         obj.receiveShadow = receiveShadow;
//         obj.castShadow = castShadow;
//         scene.add(obj);
 
//         obj.traverse(function (child) {
//           if (child.isMesh) {
//             child.castShadow = castShadow;
//             child.receiveShadow = receiveShadow;
//           }
//         });
 
//         resolve(obj);
//       },
//       undefined,
//       function (error) {
//         console.log(error);
//         reject(error);
//       }
//     );
//   });
// }
 
// function easeOutCirc(x) {
//   return Math.sqrt(1 - Math.pow(x - 1, 4));
// }
 
// const Model = ({ modelUrl, widthPercent, height }) => {
//   const refContainer = useRef();
//   const [loading, setLoading] = useState(true);
//   const [renderer, setRenderer] = useState();
//   const initialized = useRef(false); // Ref to track initialization
 
//   useEffect(() => {
//     if (!initialized.current) {
//       const { current: container } = refContainer;
//       if (container && !renderer) {
//         const scW = container.clientWidth * (widthPercent / 100);
//         const scH = height;
//         const renderer = new THREE.WebGLRenderer({
//           antialias: true,
//           alpha: true
//         });
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.setSize(scW, scH);
//         renderer.outputEncoding = THREE.sRGBEncoding;
//         container.appendChild(renderer.domElement);
//         setRenderer(renderer);
 
//         const scene = new THREE.Scene();
//         const scale = 10;
//         const camera = new THREE.OrthographicCamera(
//           -scale,
//           scale,
//           scale,
//           -scale,
//           0.01,
//           50000
//         );
//         const target = new THREE.Vector3(-0.5, 1.2, 0);
//         const initialCameraPosition = new THREE.Vector3(
//           20 * Math.sin(0.2 * Math.PI),
//           10,
//           20 * Math.cos(0.2 * Math.PI)
//         );
//         const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
//         scene.add(ambientLight);
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.autoRotate = true;
//         controls.target = target;
 
//         loadGLTFModel(scene, modelUrl, {
//           receiveShadow: false,
//           castShadow: false
//         }).then(() => {
//           animate();
//           setLoading(false);
//         });
 
//         let req = null;
//         let frame = 0;
//         const animate = () => {
//           req = requestAnimationFrame(animate);
//           frame = frame <= 100 ? frame + 1 : frame;
 
//           if (frame <= 100) {
//             const p = initialCameraPosition;
//             const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
 
//             camera.position.y = 10;
//             camera.position.x =
//               p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
//             camera.position.z =
//               p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
//             camera.lookAt(target);
//           } else {
//             controls.update();
//           }
 
//           renderer.render(scene, camera);
//         };
 
//         initialized.current = true; // Mark initialization as completed
 
//         return () => {
//           cancelAnimationFrame(req);
//           renderer.dispose();
//         };
//       }
//     }
//   }, [renderer, modelUrl, widthPercent, height]);
 
//   return (
//     <div
//       style={{ height: `${height}px`, width: `${widthPercent}%`, position: "relative" }}
//       ref={refContainer}
//     >
//       {loading && (
//         <span style={{ position: "absolute", left: "50%", top: "50%" }}>
//           Loading...
//         </span>
//       )}
//     </div>
//   );
// };

// export default Model;


import React, { useEffect, useRef, useState } from "react";
import "@babylonjs/viewer";
import "@babylonjs/loaders";



const Model = ({ modelUrl, width, height }) => {
  const viewerContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeViewer = () => {
      try {
        console.log("Initializing viewer...");

        const viewer = window.Viewer3D.CreateViewer(viewerContainer.current, {
          model: { url: modelUrl },
          environment: { environmentMapUrl: "none" }
        });

        viewer.onInitDoneObservable.add(() => {
          console.log("Viewer initialized.");
          setLoading(false);
        });

        viewer.onErrorObservable.add((err) => {
          console.error("Error loading model:", err);
          setLoading(false);
          setError(err.message);
        });
      } catch (err) {
        console.error("Error initializing viewer:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    const handleViewerLoaded = () => {
      console.log("Babylon.js Viewer loaded.");
      initializeViewer();
    };

    if (window.Viewer3D) {
      initializeViewer();
    } else {
      console.log("Babylon.js Viewer not yet loaded. Waiting...");
      window.addEventListener("Viewer3DLoaded", handleViewerLoaded);
    }

    return () => {
      window.removeEventListener("Viewer3DLoaded", handleViewerLoaded);
    };
  }, [modelUrl]);

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px`, position: "relative" }}
      ref={viewerContainer}
    >
      {loading && (
        <span style={{ position: "absolute", left: "50%", top: "50%" }}>
          Loading...
        </span>
      )}
      {error && (
        <span style={{ position: "absolute", left: "50%", top: "50%" }}>
          Error: {error}
        </span>
      )}
    </div>
  );
};

export default Model;
