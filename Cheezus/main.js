import * as THREE from "./three/build/three.module.js";

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a large sphere to the scene
const sphereGeometry = new THREE.SphereGeometry(500, 32, 32); // Increase the radius to make it large
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
backgroundSphere.position.set(0, -window.innerHeight * 0.4, 0); // Adjust the position
scene.add(backgroundSphere);

// Bootstrap Interaction
document.getElementById('start-button').addEventListener('click', function() {
    // Hide the start screen
    document.getElementById('start-screen').style.display = 'none';
    
    // Start the game or transition to the main screen
});
