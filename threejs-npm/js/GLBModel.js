import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class GLBModel {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.model = null;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        console.log(this.scene, this.camera, this.renderer);
    }

    async loadGLTFModel(url) {
        const loader = new GLTFLoader();
        console.log('Loading model:', url);
        return new Promise((resolve, reject) => {
            loader.load(
                url,
                async gltf => {
                    console.log('Model loaded:', gltf);
                    this.model = gltf.scene;
                    resolve(gltf.scene);
                },
                xhr => {
                    console.log(`Model laden: ${(xhr.loaded / xhr.total) * 100}% voltooid.`);
                },
                error => {
                    console.error('Fout bij laden van model:', error);
                    this.model = null;
                    reject(error);
                }
            );
        });
    }

    async drawGLTFMesh(video, gltfUrl, points) {
        // // Calculate the center of the points
        // const center = new THREE.Vector3();
        // points.forEach(point => {
        //     center.add(point);
        // });
        // center.divideScalar(points.length);

        // // Position the mesh at the center of the points
        // this.model.position.copy(center);

        // // Add the mesh to the scene
        // this.scene.add(mesh);

        // // Render the scene
        // this.renderer.render(this.scene, this.camera);
        // Calculate the center of the points
        const center = new THREE.Vector3();
        points.forEach(point => {
            center.add(point);
        });
        center.divideScalar(points.length);

        // Create a sphere geometry
        const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // Position the sphere at the center of the points
        sphere.position.copy(center);

        // Add the sphere to the scene
        this.scene.add(sphere);

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }
}
