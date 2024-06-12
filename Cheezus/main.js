import * as THREE from "./three/build/three.module.js";

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Load the image texture
const textureLoader = new THREE.TextureLoader();
const imageUrl = 'https://deih43ym53wif.cloudfront.net/region-map-of-wales_335b997b72.png'; // Replace 'path_to_your_image.jpg' with the path to your image
const texture = textureLoader.load(imageUrl);

// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(500, 32, 32); // Increase the radius to make it large

// Apply the image texture to the sphere material
const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture }); // Use the image as material
const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(backgroundSphere);

// Position the camera farther away initially
camera.position.z = 1500; // Far away from the sphere

// WASD controls setup
const keyState = {
    w: false,
    a: false,
    s: false,
    d: false
};

document.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            keyState.w = true;
            break;
        case 'a':
            keyState.a = true;
            break;
        case 's':
            keyState.s = true;
            break;
        case 'd':
            keyState.d = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            keyState.w = false;
            break;
        case 'a':
            keyState.a = false;
            break;
        case 's':
            keyState.s = false;
            break;
        case 'd':
            keyState.d = false;
            break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere based on WASD input
    if (keyState.w) {
        backgroundSphere.rotation.x -= 0.01;
    } else if (keyState.s) {
        backgroundSphere.rotation.x += 0.01;
    } else if (keyState.a) {
        backgroundSphere.rotation.y -= 0.01;
    } else if (keyState.d) {
        backgroundSphere.rotation.y += 0.01;
    } else {
        backgroundSphere.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
}

animate();
