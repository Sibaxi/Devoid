import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { LineSegments, WebGLRenderer } from "three";
import useDetectSize from "../../hooks/detectSize";

export default function Animation() {
  const container = useRef(null);
  const screen = useDetectSize();
  const [visible, setVisible] = useState(true);

  let renderer: WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    sphere: LineSegments,
    size: number;

  function animate() {
    update();
    /* render scene and camera */
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (window && container.current) {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

      renderer = new THREE.WebGLRenderer({
        canvas: container.current,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      console.log(scene.children);
      const geometry = new THREE.SphereGeometry(1, 66, 16);
      const material = new THREE.LineBasicMaterial({ color: 0xd3d3d3 });

      const wireframe = new THREE.EdgesGeometry(geometry, 5.5);
      sphere = new THREE.LineSegments(wireframe, material);
      scene.add(sphere);
      //   const cube = new THREE.Mesh(geometry, material);
      //   scene.add(cube);
      console.log(scene.children);
      camera.position.z = 2.2;

      renderer.render(scene, camera);

      window.addEventListener("resize", onWindowResize, false);
      requestAnimationFrame(animate);

      // Cleanup on unmount, otherwise stuff will linger in GPU
      return () => {
        setVisible(false);
      };
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      renderer.forceContextLoss();
      renderer.dispose();
      sphere.geometry.dispose();
      //   sphere.material.dispose();
    }
  }, [visible]);

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function update() {
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
    sphere.rotation.z += 0.001;
  }

  return (
    <div className="absolute bottom-0 right-0">
      <canvas ref={container} />;
    </div>
  );
}
