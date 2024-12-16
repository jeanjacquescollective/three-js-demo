// Basisopstelling voor Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Verlichting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Zacht omgevingslicht
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Richtingslicht
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);

// Camera positie
camera.position.set(3, 2, 5);

// OrbitControls voor camerabediening
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Voor soepel draaien
controls.dampingFactor = 0.05;

// Achtergrondkleur
scene.background = new THREE.Color(0x000000); // Zwarte achtergrond

// GLTF Loader om Walkman-model in te laden
const loader = new THREE.GLTFLoader();
loader.load(
    './vintage_camera/scene.gltf', // Pad naar het model
    (gltf) => {
        const cameraModel = gltf.scene;
        cameraModel.scale.set(4, 4, 4); // Schaal het model
        cameraModel.position.set(0, -1, 0); // Positioneer op het podium
        cameraModel.rotation.y = Math.PI / 3; // Draai het model
        cameraModel.rotation.x = - Math.PI / 10;
        scene.add(cameraModel);
    },
    (xhr) => {
        console.log(`Model laden: ${(xhr.loaded / xhr.total) * 100}% voltooid.`);
    },
    (error) => {
        console.error('Fout bij laden van model:', error);
    }
);

// Animatielus
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
}
animate();

// Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Point lights
const pointLight1 = new THREE.PointLight(0xff6347, 1.5, 50);
pointLight1.position.set(0, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00ff00, 1.5, 50);
pointLight2.position.set(-5, 5, 0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x0000ff, 1.5, 50);
pointLight3.position.set(5, 5, -5);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xffff00,1, 50);
pointLight4.position.set(5, -5, 5);
scene.add(pointLight4);

const pointLight5 = new THREE.PointLight(0xff00ff, 1, 50);
pointLight5.position.set(-5, -5, -5);
scene.add(pointLight5);

const pointLight6 = new THREE.PointLight(0x00ffff, 1, 50);
pointLight6.position.set(5, 5, 5);
scene.add(pointLight6);

const ambientLight2 = new THREE.AmbientLight(0x404040, 1); // Extra zacht omgevingslicht
scene.add(ambientLight2);



function animateLight() {
    pointLight1.position.x = Math.sin(Date.now() * 0.001) * 5;
    pointLight1.position.z = Math.cos(Date.now() * 0.001) * 5;
    pointLight2.position.x = Math.sin(Date.now() * 0.001 + Math.PI
    ) * 5;
    pointLight2.position.z = Math.cos(Date.now() * 0.001 + Math.PI) * 5;
    pointLight3.position.x = Math.sin(Date.now() * 0.001 + Math.PI / 2) * 5;
    pointLight3.position.z = Math.cos(Date.now() * 0.001 + Math.PI / 2) * 5;
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects);    
    const heroText = document.getElementById('hero-text');
    if (intersects.length > 0) {
        let intersectedObject = intersects[0].object;
        let parent = intersectedObject.parent;
        while (parent) {
            if (parent.name === 'Sketchfab_model') {
            intersectedObject = parent;
            console.log(intersectedObject);
            break;
            }
            parent = parent.parent;
        }
        if (intersectedObject.name === 'Sketchfab_model') { // Assuming the model is named 'Walkman'
            heroText.classList.add('active');
            heroText.classList.remove('hidden');
        } else {
            heroText.classList.remove('active');
            heroText.classList.add('hidden');
        }
    } else {
        heroText.classList.remove('active');
        heroText.classList.add('hidden');
    }
});
