import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const canvas = document.querySelector(".webgl")
const scene = new THREE.Scene() 

const loader = new STLLoader()
loader.load("urov_model.stl", function(geometry) {
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error) {
    console.log("An error has occurred.")
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 5)
scene.add(light)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)
camera.zoom = 0.1
camera.position.set(0, 3, 1)
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
camera.position.set( 0, 4, 5 );
camera.rotation.set(0, 0, 0)
controls.update();

let t = 0;
function animate() {
    requestAnimationFrame(animate)
    //if(wraith) wraith.position.set(Math.sin(0.02*t), 0, 0)
    t += 1;
    renderer.render(scene, camera)
}

animate()