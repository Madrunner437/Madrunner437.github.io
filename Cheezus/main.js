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

// Create a shader material for the sphere
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vPos;

        void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vPos;

        void main() {
            float r = length(vPos);
            vec3 color = vec3(r, r, r); // Use the position as the color
            gl_FragColor = vec4(color, 1.0);
        }
    `
});

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(5, 32, 32);

// Create a sphere mesh with the geometry and shader material
const sphere = new THREE.Mesh(geometry, shaderMaterial);

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
