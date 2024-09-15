//===================================================
/* "It is not an actual project; therefore,
I rely on comments to assess the code." */
//===================================================
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;
const clock = new THREE.Clock();

//================= Mesh =======================
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//================ Camera ======================
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
camera.position.z = 5;
camera.position.y = 1;

//============ Orbit Controls ==================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//=============== Renderer =====================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//============== Resize Listener ===================
let resizeTimeout;

const onWindowResize = () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }, 200);
};

window.addEventListener('resize', onWindowResize);

//=============== Helpers ======================
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//================= Animate ======================
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
