import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {GUI} from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: memory
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotate X')
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotate Y')
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotate Z')
cubeFolder.open()

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', -5, 5).name('Position X')
cameraFolder.add(camera.position, 'y', -5, 5).name('Position Y')
cameraFolder.add(camera.position, 'z', -5, 5).name('Position Z')
cameraFolder.add(camera, 'fov', 1, 180).name('Field of View')
cameraFolder.open()
// gui.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotate X')
// gui.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotate Y')
// gui.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotate Z')
// gui.add(cube.scale, 'x', 0.1, 3).name('Scale X')
// gui.add(cube.scale, 'y', 0.1, 3).name('Scale Y')
// gui.add(cube.scale, 'z', 0.1, 3).name('Scale Z')
// gui.add(cube.position, 'x', -5, 5).name('Position X')
// gui.add(cube.position, 'y', -5, 5).name('Position Y')
// gui.add(cube.position, 'z', -5, 5).name('Position Z')
// gui.add(cube.material, 'wireframe').name('Wireframe')
// gui.add(cube.material, 'visible').name('Visible')
// gui.add(cube.material, 'side', {
//   Front: THREE.FrontSide,
//   Back: THREE.BackSide,
//   Double: THREE.DoubleSide
// }).name('Material Side')
// gui.add(cube.material, 'flatShading').name('Flat Shading')
// gui.add(cube.material, 'transparent').name('Transparent')
// gui.add(cube.material, 'opacity', 0, 1).name('Opacity')

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)

  stats.update()
}

animate()