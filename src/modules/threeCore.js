import * as THREE from 'three';
import gsap from 'gsap';

export function initThreeCore(canvasSelector, containerSelector) {
    const canvas = document.querySelector(canvasSelector);
    const container = document.querySelector(containerSelector);
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xAE9775, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Obsidian Entity (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x09090B,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: 0xAE9775,
        emissiveIntensity: 0.05
    });
    const entity = new THREE.Mesh(geometry, material);
    scene.add(entity);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xAE9775,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Logic
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);

        entity.rotation.y += 0.005;
        entity.rotation.x += 0.002;

        entity.rotation.y += mouseX * 0.05;
        entity.rotation.x += mouseY * 0.05;

        particlesMesh.rotation.y -= 0.001;

        // Scroll interaction
        const scrollY = window.scrollY;
        entity.position.y = -scrollY * 0.002;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
