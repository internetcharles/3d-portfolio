import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('#bg')

// Scene
const scene = new THREE.Scene()

const fontLoader = new THREE.FontLoader()

fontLoader.load(
  '/static/helvetiker_regular.typeface.json',
  (font) =>
  {
      const textGeometry = new THREE.TextGeometry(
          "charlie smith",
          {
              font: font,
              size: 0.5,
              height: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 5
          }
      )
      const textGeometry2 = new THREE.TextGeometry(
        "web/game developer",
        {
            font: font,
            size: 0.2,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        }
    )
      const textMaterial = new THREE.MeshNormalMaterial()
      const text = new THREE.Mesh(textGeometry, textMaterial)
      text.position.y = 5;
      text.position.z = 0;
      text.position.x = 8;
      const text2 = new THREE.Mesh(textGeometry2, textMaterial)
      text2.position.y = 4.4;
      text2.position.z = 0;
      text2.position.x = 8;
      text.rotateY(0.26)
      text.rotateX(-0.3)
      text2.rotateY(0.26)
      text2.rotateX(-0.3)
      scene.add(text, text2)
      text.on('click', () => console.log('hello'))
  }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  '/static/room.glb',
  (gltf) => {
  gltf.scene.traverse(function(node) {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
    }
  });
  scene.add(gltf.scene);
  }
)

gltfLoader.load(
  '/static/polyman.glb',
  (gltf) => {
  gltf.scene.traverse(function(node) {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
    }
  });
  gltf.scene.rotateY(180);
  gltf.scene.position.set(-0.95, 1.1, -1)
  scene.add(gltf.scene);
  }
)


window.addEventListener('load', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // camera.position.x = (sizes.width / sizes.height) * 15.5;
    // camera.position.y = (sizes.width / sizes.height) * 8;
    // camera.position.z = (sizes.width / sizes.height) * 3;

    if(sizes.width < 1200) {
      camera.lookAt(7.5, 0, -12)
      camera.position.set(12.5, 8, 8)
    } else {
      camera.lookAt(0, -1, -8)
      camera.position.x = (sizes.width / sizes.height) * 15.5;
      camera.position.y = (sizes.width / sizes.height) * 8;
      camera.position.z = (sizes.width / sizes.height) * 3;
    }

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // camera.position.x = (sizes.width / sizes.height) * 15.5;
    // camera.position.y = (sizes.width / sizes.height) * 8;
    // camera.position.z = (sizes.width / sizes.height) * 3;

    if(sizes.width < 1200) {
      camera.lookAt(7.5, 0, -10.5)
      camera.position.set(11.5, 8, 8)
    } else {
      camera.lookAt(0, -1, -8)
      camera.position.x = (sizes.width / sizes.height) * 15.5;
      camera.position.y = (sizes.width / sizes.height) * 8;
      camera.position.z = (sizes.width / sizes.height) * 3;
    }

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
camera.position.set(11.5, 8, 5.6)
camera.lookAt(9, 6, 3)
scene.add(camera)


const sphere = new THREE.SphereGeometry(0.15);

const spotlight = new THREE.SpotLight(0xF7EC98, 1.0);
spotlight.position.set(-3.1, 3, -1.41);
spotlight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
spotlight.castShadow = true;
scene.add(spotlight);

const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 200, 0.8, 0.8 );
rectLight3.position.set( -2.6, 2.85, -2.6 );
rectLight3.rotateY(180)
scene.add( rectLight3 );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor(0x000000)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    camera.position.x = 12 + Math.sin(elapsedTime) * 0.1
    camera.position.y = 8 + Math.sin(elapsedTime) * 0.1

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()