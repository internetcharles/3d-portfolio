import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as TWEEN from '@tweenjs/tween.js';
import { gsap } from 'gsap';


/**
 * Base
 */
// Debug

// DOM Nodes
// const aboutDiv = document.createElement('div');
// const aboutContent = document.createTextNode("ABOUT");
// const projectsContent = document.createTextNode("PROJECTS");
// const creditsContent = document.createTextNode("CREDITS");

// aboutDiv.className = "about";
// aboutContent.className = "about-text";
// projectsContent.className = "projects-text";
// creditsContent.className = "credits-text";

// aboutDiv.appendChild(aboutContent);
// aboutDiv.appendChild(projectsContent);
// aboutDiv.appendChild(creditsContent);

// const currentDiv = document.getElementById('info');
// document.body.insertBefore(aboutDiv, currentDiv)


// Canvas
const canvas = document.querySelector('#bg')

// Conditionals
let viewingProjects = false;
let viewingAbout = false;
let viewingHome = true;



// Scene
const scene = new THREE.Scene()

const fontLoader = new THREE.FontLoader()

fontLoader.load(
  '/helvetiker_regular.typeface.json',
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
  }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Loaders
 */
 const loadingBarElement = document.querySelector('.loading-bar')

 const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
      window.setTimeout(() =>
      {
          gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

          loadingBarElement.classList.add('ended')
          loadingBarElement.style.transform = ''
      }, 500)
    },
      // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
 )
 const gltfLoader = new GLTFLoader(loadingManager)
 const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

gltfLoader.load(
  '/room.glb',
  (gltf) => {
  scene.add(gltf.scene);
  }
)

gltfLoader.load(
  '/polyman.glb',
  (gltf) => {
  gltf.scene.rotateY(180);
  gltf.scene.position.set(-0.95, 1.1, -1)
  scene.add(gltf.scene);
  }
)

gltfLoader.load(
  '/projects.glb',
  (gltf) => {
  gltf.scene.position.set(-10, 2, -10)
  scene.add(gltf.scene);
  }
);

/**
 * Overlay
 */


 const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
 const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms:
  {
      uAlpha: { value: 1 }
  },
  vertexShader: `
      void main()
      {
        gl_Position = vec4(position, 1.0);
      }
  `,
  fragmentShader: `
  uniform float uAlpha;

  void main()
  {
      gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
  }
`,
}) 
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
 scene.add(overlay)

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

    if (!viewingProjects) {
      if(sizes.width < 1200) {
        camera.lookAt(7.5, 0, -10.5)
        camera.position.set(11.5, 8, 8)
      } else {
        camera.lookAt(0, -1, -8)
        camera.position.x = (sizes.width / sizes.height) * 15.5;
        camera.position.y = (sizes.width / sizes.height) * 8;
        camera.position.z = (sizes.width / sizes.height) * 3;
      }
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

camera.far = 100;


const pointlight2 = new THREE.PointLight(0xFFFFFF, 0.5);
scene.add(pointlight2);

const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 200, 0.8, 0.8 );
rectLight3.position.set( -2.6, 2.85, -2.6 );
rectLight3.rotateY(180)
scene.add( rectLight3 );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight)

const tweenCamera = (camera, position, duration, target) => {   
  new TWEEN.Tween(camera.position).to({
    x: position[0],
    y: position[1],
    z: position[2]
  }, duration)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .start();
}

const tweenToProjects = () => {
  // backup original rotation
  var startRotation = camera.quaternion.clone();

  // final rotation (with lookAt)
  camera.lookAt( -6, 2, -10 );
  var endRotation = camera.quaternion.clone();

  // revert to original rotation
  camera.quaternion.copy( startRotation );

  // Tween
  new TWEEN.Tween( camera.quaternion ).to( endRotation, 600 ).start();
}

const tweenToAbout = () => {
  // backup original rotation
  var startRotation = camera.quaternion.clone();

  // final rotation (with lookAt)
  camera.lookAt( -0.95, 2.3, -1 );
  var endRotation = camera.quaternion.clone();

  // revert to original rotation
  camera.quaternion.copy( startRotation );

  // Tween
  new TWEEN.Tween( camera.quaternion ).to( endRotation, 600 ).start();
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

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

    if(viewingHome) {
      camera.position.x = 12 + Math.sin(elapsedTime) * 0.1
      camera.position.y = 8 + Math.sin(elapsedTime) * 0.1
    }
    TWEEN.update();
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

const projectsElement = document.getElementById('projects')

document.querySelector('.projects-text').addEventListener("click", () => {
  TWEEN.removeAll();
  projectsElement.classList.remove('fadeout');
  viewingProjects = true;
  viewingAbout = false;
  viewingHome = false;
  tweenCamera(camera, [-5, 2, -10], 5000 );
  setTimeout(() => {
    tweenToProjects()
  }, 5000)
  setTimeout(() => {
    projectsElement.classList.add('fadein');
  }, 6000)
});

document.querySelector('.about-text').addEventListener("click", () => {
  TWEEN.removeAll();
  projectsElement.classList.remove('fadein');
  projectsElement.classList.add('fadeout');
  viewingProjects = false;
  viewingAbout = true;
  viewingHome = false;
  tweenCamera(camera, [4, 5, 1], 5000 );
  setTimeout(() => {
    tweenToAbout()
  }, 5000)
});

tick()