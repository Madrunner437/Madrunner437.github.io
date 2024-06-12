import * as THREE from "./three/build/three.module.js";
// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

function latLonToTileCoords(lat, lon, zoom) {
    const R = 6378137; // Earth's radius in meters
    const tileSize = 256; // Size of each tile in pixels

    // Convert latitude and longitude to Mercator projection
    const x = R * (lon * Math.PI / 180);
    const y = R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));

    // Convert Mercator projection to tile coordinates
    const tileX = Math.floor((x + Math.PI) / (2 * Math.PI / Math.pow(2, zoom)));
    const tileY = Math.floor((Math.PI - y) / (2 * Math.PI / Math.pow(2, zoom)));

    return { x: tileX, y: tileY };
}

// OpenStreetMap tile server URL template
const osmUrl = 'https://a.tile.openstreetmap.org/8/52/-3.png';
const osmUrl = 'https://a.tile.openstreetmap.org/8/52/3.png';

// Create OpenStreetMap tile layer
const osmTiles = new L.TileLayer(osmUrl, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});
// Apply map tiles to sphere material
const sphereMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(osmTiles) }); // Use the map tiles as 
// Add a large sphere to the scene
const sphereGeometry = new THREE.SphereGeometry(500, 32, 32); // Increase the radius to make it large
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
    // Rotate the sphere based on WASD input
    if (keyState.w) {
        backgroundSphere.rotation.x -= 0.01
    }else if (keyState.s) {
        backgroundSphere.rotation.x += 0.01
    }else if (keyState.a){
        backgroundSphere.rotation.y -= 0.01
    }else if (keyState.d) {
        backgroundSphere.rotation.y += 0.01
    }else {
        backgroundSphere.rotation.y += 0.001
    }
    renderer.render(scene, camera);
}
animate();
