    // Basisconfiguratie
    const scene = new THREE.Scene(); // Creëer een nieuwe scène
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Creëer een perspectiefcamera
    const renderer = new THREE.WebGLRenderer(); // Creëer een WebGL renderer
    renderer.setSize(window.innerWidth, window.innerHeight); // Stel de grootte van de renderer in op de grootte van het venster
    document.body.appendChild(renderer.domElement); // Voeg de renderer toe aan het document

    // Achtergrond (ruimte)
    const loader = new THREE.TextureLoader(); // Creëer een texture loader
    scene.background = loader.load('./assets/galaxy.jpg'); // Stel de achtergrond van de scène in

    // Aarde
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32); // Creëer een bolvormige geometrie voor de aarde
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('./assets/earth.jpg'), // Laad de textuur voor de aarde
    });

    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial); // Creëer een mesh voor de aarde
    scene.add(earth); // Voeg de aarde toe aan de scène

    // Verlichting
    const ambientLight = new THREE.AmbientLight(0x404040); // Creëer zacht omgevingslicht
    scene.add(ambientLight); // Voeg het omgevingslicht toe aan de scène
    const pointLight = new THREE.PointLight(0xffffff, 1); // Creëer een puntlicht
    pointLight.position.set(5, 5, 5); // Stel de positie van het puntlicht in
    scene.add(pointLight); // Voeg het puntlicht toe aan de scène

    // Animatie
    camera.position.z = 5; // Stel de positie van de camera in
    function animate() {
        requestAnimationFrame(animate); // Vraag de volgende frame aan
        earth.rotation.y += 0.001; // Laat de aarde langzaam draaien
        renderer.render(scene, camera); // Render de scène vanuit het perspectief van de camera
    }
    animate(); // Start de animatie

    // Torus Knot + Dynamisch Licht
    const torusGeometry = new THREE.TorusKnotGeometry(6, 0.4, 100, 16); // Creëer een torus knoop geometrie
    const torusMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xff6347, // Stel de kleur in
        metalness: 0.7, // Stel de metallic waarde in
        roughness: 0.2, // Stel de ruwheid in
        reflectivity: 1 // Stel de reflectiviteit in
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial); // Creëer een mesh voor de torus knoop
    torus.castShadow = true; // Laat de torus schaduw werpen
    scene.add(torus); // Voeg de torus toe aan de scène

    const spotlight = new THREE.SpotLight(0xffa95c, 2); // Creëer een spotlicht
    spotlight.position.set(3, 3, 3); // Stel de positie van het spotlicht in
    spotlight.castShadow = true; // Laat het spotlicht schaduw werpen
    scene.add(spotlight); // Voeg het spotlicht toe aan de scène

    function animateTorus() {
        requestAnimationFrame(animateTorus); // Vraag de volgende frame aan
        torus.rotation.x += 0.003; // Laat de torus draaien om de x-as
        torus.rotation.y += 0.003; // Laat de torus draaien om de y-as
        spotlight.position.x = Math.sin(Date.now() * 0.001) * 5; // Laat het spotlicht bewegen
        renderer.render(scene, camera); // Render de scène vanuit het perspectief van de camera
    }
    animateTorus(); // Start de animatie van de torus

    // Interactief gedeelte
    const infoDiv = document.getElementById('infoDiv'); // Haal het infoDiv element op

    const raycaster = new THREE.Raycaster(); // Creëer een raycaster
    const mouse = new THREE.Vector2(); // Creëer een vector voor de muispositie

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Bereken de x-positie van de muis
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Bereken de y-positie van de muis

        raycaster.setFromCamera(mouse, camera); // Stel de raycaster in vanuit de camera en muispositie
        const intersects = raycaster.intersectObject(earth); // Controleer of de raycaster de aarde raakt

        if (intersects.length > 0) {
            infoDiv.style.display = 'block'; // Toon het infoDiv als de aarde geraakt wordt
        } else {
            infoDiv.style.display = 'none'; // Verberg het infoDiv als de aarde niet geraakt wordt
        }
    }

    window.addEventListener('click', onMouseClick, false); // Voeg een event listener toe voor muisklikken
