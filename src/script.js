import 'bootstrap/dist/css/bootstrap.css'
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader, Vector3 } from 'three';

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
renderer.outputEncoding = THREE.sRGBEncoding;

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
const ambientLight = new THREE.AmbientLight( 0x404040, 10 )
scene.add(ambientLight)

/*
*   3D Object
*/

// Loaders
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader()
gltfLoader.setCrossOrigin('anonymous');

// Geometry - Camaro
gltfLoader.load(
    './models/Camaro/scene.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
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

// Axes Helper
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.set(4.5, -1, 0.2)
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
window.changeColorBody = function(color) {
    var material;

    switch(color) {
        case 'red':
            material = new THREE.MeshBasicMaterial({ color: 0xE81e1e, side: THREE.FrontSide });
            break;
        case 'yellow':
            material = new THREE.MeshBasicMaterial({ color: 0xE1e41e, side: THREE.FrontSide });
            break;
        case 'green':
            material = new THREE.MeshBasicMaterial({ color: 0x47c316, side: THREE.FrontSide });
            break;
        case 'white':
            material = new THREE.MeshBasicMaterial({ color: 0xF9f9f9, side: THREE.FrontSide });
            break;
        case 'black':
            material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.FrontSide });
            break;
    }

    var body = new Array()
    body.push(scene.getObjectByName("Body_body_0"), scene.getObjectByName("Hood_body_0"), scene.getObjectByName("Door_FL_body_0"), scene.getObjectByName("Door_FR_body_0"), scene.getObjectByName("Trunkdoor_body_0"), scene.getObjectByName("Bumper_rear_UCB_BOTTOM_0"))
    body.forEach(part => {
        part.material = material;
    });
}

window.changeColorRim = function(color) {
    var material;
    var texture;

    switch(color) {
        case 'gris':
            texture = textureLoader.load( './models/Camaro/textures/RIMMUSCLE_01_baseColor.png' );
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = false;
            material = new THREE.MeshBasicMaterial({ map: texture });
            break;
        case 'negro':
            material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            break;
        case 'dorado':
            material = new THREE.MeshBasicMaterial({ color: 0xffd700 });
            break;
    }
    
    var rims = new Array()
    rims.push(scene.getObjectByName("Wheel_FL_RIMMUSCLE_01_0"), scene.getObjectByName("Wheel_FR_RIMMUSCLE_01_0"), scene.getObjectByName("Wheel_RL_RIMMUSCLE_01_0"), scene.getObjectByName("Wheel_RR_RIMMUSCLE_01_0"))
    rims.forEach(rim => {
        rim.material = material;
    });
}

window.changeSize = function(size) {
    var i = 0;
    var positionX = 0;
    var scale = new Vector3;

    switch(size) {
        case '14':
            scale.set(0.9, 0.9, 1);
            positionX = 35
            break;
        case '15':
            scale.set(1, 1, 1);
            positionX = 0
            break;
        case '16':
            scale.set(1.1, 1.1, 1);
            positionX = -35
            break;
        case '17':
            scale.set(1.2, 1.2, 1);
            positionX = -70
            break;
    }

    var rims = new Array()
    rims.push(scene.getObjectByName("Wheel_FL_RIMMUSCLE_01_0"), scene.getObjectByName("Wheel_FR_RIMMUSCLE_01_0"), scene.getObjectByName("Wheel_RL_RIMMUSCLE_01_0"), scene.getObjectByName("Wheel_RR_RIMMUSCLE_01_0"))
    rims.forEach(rim => {
        if(i<2) {
            rim.scale.copy(scale);
        } else {
            rim.scale.copy(scale);
            rim.position.x = positionX;
            console.log(rim.position)
        }
        i++
    });
}

tick();


window.onload = () => {
    resize()
    console.log(scene)
}