import 'bootstrap/dist/css/bootstrap.css'
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as dat from 'dat.gui';

// Sizes
const container = document.querySelector('.model-container');
const sizes = {
    width: container.clientWidth,
    height: container.clientHeight
}

window.addEventListener('resize', ()=> {
    resize();
})

function resize() {
    // Update sizes
    sizes.width = container.clientWidth;
    sizes.height = container.clientHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }

    resize();
})

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
})

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xadd8e6 );

// Light
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
 scene.add(ambientLight)

/*
*   3D Object
*/

// Texture
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

// Texturas fuera
var colorTextureBody = textureLoader.load('/textures/Cadillac/Body_Base_Color.png');
colorTextureBody.generateMipmaps = false;
colorTextureBody.minFilter = THREE.NearestFilter;
colorTextureBody.magFilter = THREE.NearestFilter;
var heightTextureBody = textureLoader.load('/textures/Cadillac/Body_Height.png');
var normalTextureBody = textureLoader.load('/textures/Cadillac/Body_Normal.png');
var metalnessTextureBody = textureLoader.load('/textures/Cadillac/Body_Metallic.png');
var roughnessTextureBody = textureLoader.load('/textures/Cadillac/Body_Roughness.png');

// Texturas cristal
var colorTextureGlass = textureLoader.load('/textures/Cadillac/Glass_Base_Color.png');
colorTextureGlass.generateMipmaps = false;
colorTextureGlass.minFilter = THREE.NearestFilter;
colorTextureGlass.magFilter = THREE.NearestFilter;
var heightTextureGlass = textureLoader.load('/textures/Cadillac/Glass_Height.png');
var normalTextureGlass = textureLoader.load('/textures/Cadillac/Glass_Normal.png');
var metalnessTextureGlass = textureLoader.load('/textures/Cadillac/Glass_Metallic.png');
var roughnessTextureGlass = textureLoader.load('/textures/Cadillac/Glass_Roughness.png');

// Texturas dentro
var colorTextureInterior = textureLoader.load('/textures/Cadillac/Interior_Base_Color.png');
colorTextureInterior.generateMipmaps = false;
colorTextureInterior.minFilter = THREE.NearestFilter;
colorTextureInterior.magFilter = THREE.NearestFilter;
var heightTextureInterior = textureLoader.load('/textures/Cadillac/Interior_Height.png');
var normalTextureInterior = textureLoader.load('/textures/Cadillac/Interior_Normal.png');
var metalnessTextureInterior = textureLoader.load('/textures/Cadillac/Interior_Metallic.png');
var roughnessTextureInterior = textureLoader.load('/textures/Cadillac/Interior_Roughness.png');

// Array de elementos
var texturasBase = new Array();
var texturasHeight = new Array();
var texturasNormal = new Array();
var texturasMetalness = new Array();
var texturasRoughness = new Array();
texturasBase.push(colorTextureBody, colorTextureInterior, colorTextureGlass);
texturasHeight.push(heightTextureBody, heightTextureInterior, heightTextureGlass);
texturasNormal.push(normalTextureBody, normalTextureInterior, normalTextureGlass);
texturasMetalness.push(metalnessTextureBody, metalnessTextureInterior, metalnessTextureGlass);
texturasRoughness.push(roughnessTextureBody, roughnessTextureInterior, roughnessTextureGlass);

//Geometry
const objLoader = new OBJLoader()
objLoader.load(
    '/models/Car/cadillac.obj',
    (obj) =>
    {
        //obj.scene.scale.set(0.025, 0.025, 0.025)
        
        for(var i = 0; i < 3; i++) {
            // obj.children[i].geometry.center() // centra el mesh
            obj.children[i].material = new THREE.MeshBasicMaterial({ map: texturasBase[i] }); // añade el material
            obj.children[i].heightTexture = texturasHeight[i];
            obj.children[i].normalTexture = texturasNormal[i];
            obj.children[i].metalnessTexture = texturasMetalness[i];
            obj.children[i].roughnessTexture = texturasRoughness[i];
        }
        
        scene.add(obj)
    },
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' + error );
	}
);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.set(400, 130, 7)
scene.add(camera)

// Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animation
const tick = () => {

    // Update camera
    controls.update();
    renderer.render(scene, camera);

    // Call each tick
    window.requestAnimationFrame(tick);
    // console.log(camera.position)
}

// Selector events
window.changeColor = function(color) {
    switch(color) {
        case 'red':
            mesh.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            break;
        case 'yellow':
            mesh.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            break;
        case 'green':
            mesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            break;
    }
}

window.changeSize = function(size) {
    switch(size) {
        case '14':
            mesh.geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7, 5, 5, 5);
            break;
        case '15':
            mesh.geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
            break;
        case '16':
            mesh.geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3, 5, 5, 5);
            break;
        case '17':
            mesh.geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 5, 5, 5);
            break;
    }
}

tick();


// GUI
const gui = new dat.GUI({ closed: true, width: 400 });
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', 0, 10)
cameraFolder.add(camera.position, 'y', 0, 10)
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()
const sceneFolder = gui.addFolder('scene')
sceneFolder.add(scene.position, 'z', 0, 10)
sceneFolder.open()