import * as THREE from "./three/build/three.module.js";

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add some Three.js objects to the scene (e.g., cubes, spheres, etc.)

// Bootstrap Interaction
document.getElementById('start-button').addEventListener('click', function() {
    // Hide the start screen
    document.getElementById('start-screen').style.display = 'none';
    
    // Start the game or transition to the main screen
});
