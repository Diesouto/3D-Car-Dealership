import 'bootstrap/dist/css/bootstrap.css'
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 3D container size
const container = document.querySelector('.model-container');

// Sizes
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
    canvas: canvas
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

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio,
//                                              1 * aspectRatio,
//                                              1,
//                                              -1,
//                                              0.1,
//                                              100
//                                             );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;

camera.lookAt(mesh.position)
scene.add(camera)

// Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// Clock
const clock = new THREE.Clock(); 

// Animation
const tick = () => {

    // Update camera
    controls.update();
    renderer.render(scene, camera);

    // Call each tick
    window.requestAnimationFrame(tick);
}

tick();