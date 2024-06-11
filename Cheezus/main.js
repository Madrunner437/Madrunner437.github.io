import * as THREE from "./Cheezus/build/three.module.js";

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(5, 32, 32);

// Load OpenStreetMap texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://www.openstreetmap.org/#map=18/55.59492/-2.11552');

// Create a material with the OpenStreetMap texture
const material = new THREE.MeshBasicMaterial({ map: texture });

// Create a sphere mesh with the geometry and material
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set camera position
camera.position.z = 10;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
