import './style.css'

import * as THREE from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const initialCameraZ = 30;
camera.position.setZ(initialCameraZ);

renderer.render(scene, camera);

//--------------add example torus----------
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0x44FF44});
// const torus = new THREE.Mesh( geometry, material);

//scene.add(torus);

//-----------scene background------------
const milkyWayBg = new THREE.TextureLoader().load('milkyway-bg.jpg');
scene.background = milkyWayBg;

// -------------add ring--------------
// const ringGeo = new THREE.RingGeometry(10, 12, 30);
// //const ringMaterial = new THREE.MeshStandardMaterial({color: 0xf5f542, side: THREE.DoubleSide});
// const ringTexture = new THREE.TextureLoader().load('saturnmap.jpg');
// const ringMaterial = new THREE.MeshBasicMaterial({map: ringTexture});
// const ring = new THREE.Mesh(ringGeo, ringMaterial);
// ring.rotation.x = -0.7;
//scene.add(ring);

//------------add earth-------------
const earthTexture = new THREE.TextureLoader().load('earthmap-night.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('earth-normal.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture
  })
);

scene.add(earth);

//--------------add mars------------
const marsTexture = new THREE.TextureLoader().load('mars-map.jpg');
const marsNormalTexture = new THREE.TextureLoader().load('mars-normal.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsNormalTexture
  })
);

mars.position.x = -55;
mars.position.y = -10;
mars.position.z = 40;

scene.add(mars);

//---------------add light--------------
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

scene.add(pointLight)

// ---creates a wireframe on the light source
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// ------------------add my face--------------
const moonNormal = new THREE.TextureLoader().load('moon-normal.jpg');
const biteslipTexture = new THREE.TextureLoader().load('asher3.jpg');
const asher = new THREE.Mesh(
  new THREE.SphereGeometry(5),
  new THREE.MeshBasicMaterial({map: biteslipTexture, normalMap: moonNormal})
);

asher.position.x = 100;
asher.position.y = 40;
asher.position.z = -80;
//new THREE.BoxGeometry(10,10,10)

scene.add(asher);

// ----------------add stars---------------
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0x261e14});
  const star = new THREE.Mesh(geometry, material);

  const [x, y ,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//--------------on scroll handler---------------
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = initialCameraZ + (t * -0.01);
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// ----------------animation loop-----------------
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.001;

  mars.rotation.y += 0.00094;

  asher.rotation.y += 0.007;

  renderer.render(scene, camera);
}

animate();