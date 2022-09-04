import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.138.3/examples/jsm/loaders/GLTFLoader.js';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color('skyblue');

// create the renderer
const renderer = new THREE.WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(window.innerWidth , window.innerHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// Create a camera
const fov = 35; // AKA Field of View
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1; // the near clipping plane
const far = 1000; // the far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set( 100, 1, 6);
camera.rotation.y = 90 * Math.PI / 180

scene.fog = new THREE.Fog( scene.background, 1, 1000 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.60 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.color.setHSL( 0.1, 1, 0.80 );
directionalLight.position.set( 30,30,30);

directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 3500;
directionalLight.shadow.bias = - 0.001;
//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default

scene.add(directionalLight);


const assetLoader = new GLTFLoader();
const modelUrl = new URL('assets/hemsida.glb', import.meta.url);

assetLoader.load(modelUrl.href, function(gltf) {
  scene.add(gltf.scene);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
    }
  })
}, undefined, function(error) {
  console.error(error);
});


function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate()

function moveCamera(){
camera.position.x = 100 - window.scrollY / 50;
camera.position.z = 6 - window.scrollY / -500;
}
document.onscroll = moveCamera