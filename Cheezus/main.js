import * as THREE from "./three/build/three.module.js";


// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add a large sphere to the scene
const sphereGeometry = new THREE.SphereGeometry(500, 32, 32); // Increase the radius to make it large
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Use Phong material for shading
const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(backgroundSphere);

// Add a light source
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 500); // Position the light source
scene.add(light);

// Position the camera farther away initially
camera.position.z = 1500; // Far away from the sphere

// Bootstrap Interaction
document.getElementById('start-button').addEventListener('click', function() {
    // Fade out the start screen
    document.getElementById('start-screen').classList.add('fade-out');

    // Move the camera closer to the sphere after the fade-out animation completes
    setTimeout(() => {
        document.getElementById('start-screen').style.display = 'none';

        // Animation to move the camera closer to the sphere
        const targetPosition = { z: 1000 }; // Closer position
        const duration = 2000; // Duration of the animation in milliseconds

        const startTime = performance.now();

        function animateCamera(time) {
            const elapsedTime = time - startTime;
            const t = Math.min(elapsedTime / duration, 1); // Normalize elapsed time
            camera.position.z = 1500 + t * (targetPosition.z - 1500); // Linear interpolation

            if (t < 1) {
                requestAnimationFrame(animateCamera);
            }
        }

        requestAnimationFrame(animateCamera);
    }, 500); // Match the transition duration
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    backgroundSphere.rotation.y += 0.001; // Rotate the sphere for effect
    renderer.render(scene, camera);
}

animate();
