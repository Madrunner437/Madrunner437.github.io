import * as THREE from "./three/build/three.module.js";

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add a large sphere to the scene
const sphereGeometry = new THREE.SphereGeometry(500, 32, 32); // Increase the radius to make it large
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
backgroundSphere.position.set(0, -window.innerHeight * 0.4, 0); // Adjust the position
scene.add(backgroundSphere);

// Position the camera farther away initially
camera.position.z = 1500; // Far away from the sphere

// Bootstrap Interaction
document.getElementById('start-button').addEventListener('click', function() {
    // Start the game or transition to the main screen after the fade-out animation completes
    // Move the camera closer to the sphere after the fade-out animation completes
    setTimeout(() => {
        var container = document.getElementById("start-screen");
        while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
        var textElement = document.createElement('h1');
        textElement.textContent = 'This is a skeleton website. This game has not been created yet.';
        // Create a button element
        var button = document.createElement('button');
        button.textContent = 'Home page';
        button.addEventListener('click', function() {
        // Reload the page
        location.reload();
            });
        button.style.width = '80%';
        button.style.height = '20vh';
        button.style.fontSize = '5vw';
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        button.style.border = 'none';
        button.style.color = '#333';
        button.style.cursor = 'pointer';
        document.getElementById("start-screen").appendChild(textElement);
        document.getElementById("start-screen").appendChild(button);
        var startScreen = document.getElementById('start-screen');
        // Add styles to the element
        startScreen.style.position = 'absolute';
        startScreen.style.top = '10%';
        startScreen.style.left = '0';
        startScreen.style.width = '100%';
        startScreen.style.height = '100%';
        startScreen.style.display = 'flex';
        startScreen.style.justifyContent = 'center';
        startScreen.style.alignItems = 'center';
        startScreen.style.flexDirection = 'column';
        startScreen.style.zIndex = '2';
        startScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        startScreen.style.opacity = '0.6';
        startScreen.style.transition = 'opacity 0.5s ease';
        var EventButton = document.createElement("button");
        EventButton.textContent = "Register for event";
        document.getElementById("start-screen").appendChild(EventButton);
        EventButton.addEventListener('click', function() {
            // Redirect to another webpage
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSe_QZTQYdw53eVUDQpGUMeIZ2uY3njrUDBP8pSebMmu6WGckQ/viewform?vc=0&c=0&w=1&flr=0';
            });
        EventButton.style.width = '80%';
        EventButton.style.height = '20vh';
        EventButton.style.fontSize = '5vw';
        EventButton.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        EventButton.style.border = 'none';
        EventButton.style.color = '#333';
        EventButton.style.cursor = 'pointer';
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
