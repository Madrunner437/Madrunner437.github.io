import * as THREE from "./three/build/three.module.js";

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2); // Adjust camera position to be closer to the surface of the sphere

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a red material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Create a sphere mesh with the geometry and material
const sphere = new THREE.Mesh(geometry, material);

// Add the sphere to the scene
scene.add(sphere);

// Define rotation speed
const rotationSpeed = 0.01;

// Render the scene and animate the rotation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere northeast
    sphere.rotation.x += rotationSpeed;
    sphere.rotation.y += rotationSpeed;

    renderer.render(scene, camera);
}
animate();
