import * as THREE from "./three/build/three.module.js";

// Create a Three.js scene
const scene = new THREE.Scene();

// Create an orthogonal camera
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000);

// Position the camera tangent to the sphere's surface
const cameraPosition = new THREE.Vector3(0, 0, 10); // Adjust the z value to move the camera closer or further from the sphere
camera.position.copy(cameraPosition);

// Look at the center of the sphere
camera.lookAt(0, 0, 0);

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
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

    // Rotate the sphere
    sphere.rotation.y += rotationSpeed;

    renderer.render(scene, camera);
}
animate();
