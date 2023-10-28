import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Redondea los vértices de un objeto 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5);
camera.position.set(0, 0, 1);

const scene = new THREE.Scene();

// Añade una luz para que el modelo sea visible
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

const loader = new GLTFLoader();

loader.load('public/js.gltf', function(gltf) {
    scene.add(gltf.scene);
}, undefined, function(error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);

    // Renderiza la escena con la cámara
    renderer.render(scene, camera);
}

animate();