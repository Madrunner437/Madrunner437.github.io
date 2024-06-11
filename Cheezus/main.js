import * as THREE from "./three/build/three.module.js";

let isGameStarted = false;

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10); // Set initial camera position

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a red material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(5, 32, 32);

// Create a sphere mesh with the geometry and material
const sphere = new THREE.Mesh(geometry, material);

// Add the sphere to the scene
scene.add(sphere);

// Define rotation speed
const rotationSpeed = 0.01;

// Render the scene and animate the rotation
function animate() {
    requestAnimationFrame(animate);

    if (isGameStarted) {
        // Move camera towards the sphere
        camera.position.z -= 0.1;
    }

    // Rotate the sphere
    sphere.rotation.y += rotationSpeed;

    renderer.render(scene, camera);
}
animate();

function startGame() {
    isGameStarted = true;
    // Hide title screen
    document.querySelector('.title-screen').style.display = 'none';
}
