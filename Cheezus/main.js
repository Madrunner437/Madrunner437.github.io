import * as THREE from "./Cheezus/build/three.module.js";
import { OrbitControls } from "./Cheezus/examples/jsm/controls/OrbitControls.js";

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create initial sphere geometry
const initialGeometry = new THREE.SphereGeometry(5, 32, 32);

// Load initial OpenStreetMap texture based on initial coordinates
let initialTextureURL = 'https://a.tile.openstreetmap.org/13/1310/3288.png';
let initialTexture = new THREE.TextureLoader().load(initialTextureURL);

// Create initial material with the initial OpenStreetMap texture
const initialMaterial = new THREE.MeshBasicMaterial({ map: initialTexture });

// Create initial sphere mesh with the initial geometry and material
let sphere = new THREE.Mesh(initialGeometry, initialMaterial);
scene.add(sphere);

// Set initial camera position
camera.position.z = 10;

// Initialize OrbitControls for user interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Function to update the texture of the sphere based on new coordinates
function updateTexture(latitude, longitude, zoom) {
    // Construct the URL for the new OpenStreetMap tile based on the provided coordinates
    let newTextureURL = `https://a.tile.openstreetmap.org/${zoom}/${latitude}/${longitude}.png`;

    // Load the new OpenStreetMap texture
    let newTexture = new THREE.TextureLoader().load(newTextureURL);

    // Update the material of the sphere with the new texture
    sphere.material.map = newTexture;
    sphere.material.needsUpdate = true;
}

// Function to handle user input or events (e.g., mouse movements or clicks)
function handleUserInput(latitude, longitude, zoom) {
    // Update the texture of the sphere based on the new coordinates
    updateTexture(latitude, longitude, zoom);
}

// Example usage: call handleUserInput with new coordinates to update the sphere
handleUserInput(40.7128, -74.0060, 13);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for user interaction
    renderer.render(scene, camera);
}
animate();
