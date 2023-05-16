import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector(".webgl")
const scene = new THREE.Scene() 

const loader = new GLTFLoader()
let bike;
loader.load("bike4.glb", function(glb) {
    console.log(glb)
    bike = glb.scene
    bike.scale.set(1.5, 1.5, 1.5)
    bike.position.set(0, 0, -8);
    bike.rotation.set(0, 4.725, 0);
    scene.add(bike)
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error) {
    console.log("An error has occurred.")
})


const dlight = new THREE.DirectionalLight(0xffffff, 1) 
const alight = new THREE.AmbientLight(0xffffff, 1)
dlight.position.set(0, 3, 0)
scene.add(alight)
scene.add(dlight)

// var grid = new THREE.GridHelper(10, 20);
// scene.add(grid);


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, .1, 1000)
camera.zoom = .1
camera.position.set(0, 0, 0)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 4, 5);
camera.rotation.set(0, 0, 0)
controls.update();

window.addEventListener('mousedown', function(e) {
    camera.position.set(0, 5, 5)
})

let t = 0;
let bike_audio = new Audio("bike_audio.mp3")
bike_audio.addEventListener('canplay', e => {
    console.log('canplay');
    audio.play();
  });

function animate() {
    requestAnimationFrame(animate)
    if (bike && t < 80) {
        bike.position.set(0, 0, -8+(.1*t))
        bike_audio.play()
    }
    if (t == 80) {
        bike_audio.pause()
    }
    if (t == 120) {
        bike.rotation.set(0, 4, 0)
    }
    if (t > 120 && t < 180) {
        bike.position.set(0.05*(t-120), 0, 0.03*(t-120))
        bike.scale.set(1.5-(0.003*(t-120)), 1.5-(0.003*(t-120)), 1.5-(0.003*(t-120)))
    }
    if (t == 180) {
        //document.getElementById("links").style.visibility = "visible"
    }
    t += 1;
    renderer.render(scene, camera)
}
animate()