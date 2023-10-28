import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
//There are a few different cameras in three.js. For now, let's use a PerspectiveCamera.
// 1 parámetro: field of view. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
// 2 The second one is the aspect ratio
// The next two attributes are the near and far
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//The third thing we need is a Mesh. A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );


//For view we need what's called a render or animate loop.

function animate() {
    //This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages. Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.
    requestAnimationFrame( animate );

    renderer.setAnimationLoop( function () {

        renderer.render( scene, camera );
    
    } );

    //renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

if ( WebGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	animate();

} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}


