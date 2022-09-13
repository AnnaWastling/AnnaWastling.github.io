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
camera.position.set( 103, 1, 8);
camera.rotation.y = 90 * Math.PI / 180

scene.fog = new THREE.Fog( scene.background, 1, 1000 );
const hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
scene.add(hemilight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled = true;
// const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
// scene.add( ambientLight );

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight( 0xffa95c, 4);
light.castShadow = true; // default false
light.shadow.bias = -0.0001;
light.shadow.mapSize.width = 1024*4;
light.shadow.mapSize.height = 1024*4;
scene.add( light );

const assetLoader = new GLTFLoader();
const modelUrl = new URL('assets/hemsida2.glb', import.meta.url);

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
  light.position.set(camera.position.x + 10, camera.position.y + 10, camera.position.z + 10)
}

animate()

function moveCamera(){
camera.position.x = 100 - window.scrollY / 40;
}
document.onscroll = moveCamera