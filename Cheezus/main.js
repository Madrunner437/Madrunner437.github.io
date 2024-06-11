import * as THREE from "./three/build/three.module.js";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";

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
const texture = textureLoader.load('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Create a material with the OpenStreetMap texture
const material = new THREE.MeshBasicMaterial({ map: texture });

// Create a sphere mesh with the geometry and material
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set camera position
camera.position.z = 10;

// Add OrbitControls for user input
const controls = new OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for user interaction
    renderer.render(scene, camera);
}
animate();
