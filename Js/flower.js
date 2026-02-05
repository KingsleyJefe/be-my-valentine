const canvas = document.getElementById('flower-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Flower Group
const flowerGroup = new THREE.Group();

// Stem
const stemGeometry = new THREE.CylinderGeometry(0.05, 0.08, 4, 8);
const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5016 });
const stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.y = -2;
flowerGroup.add(stem);

// Petals
const petalGeometry = new THREE.SphereGeometry(0.6, 16, 16);
const petalMaterial = new THREE.MeshPhongMaterial({ color: 0xef4444, shininess: 30 });
const petals = [];
const numPetals = 8;
for (let i = 0; i < numPetals; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    const angle = (i / numPetals) * Math.PI * 2;
    petal.position.x = Math.cos(angle) * 0.8;
    petal.position.z = Math.sin(angle) * 0.8;
    petal.scale.set(0.1, 0.1, 0.1);
    petal.userData.angle = angle;
    petal.userData.originalScale = 1.2;
    petals.push(petal);
    flowerGroup.add(petal);
}

// Center
const centerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xfcd34d, shininess: 50 });
const center = new THREE.Mesh(centerGeometry, centerMaterial);
center.scale.set(0.1, 0.1, 0.1);
flowerGroup.add(center);

flowerGroup.position.y = -1.5;
scene.add(flowerGroup);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const pointLight = new THREE.PointLight(0xffffff, 0.8); pointLight.position.set(5,5,5); scene.add(pointLight);
const backLight = new THREE.PointLight(0xec4899,0.4); backLight.position.set(-5,-5,-5); scene.add(backLight);

// Bloom
let scrollProgress = 0;
function updateFlowerBloom(progress) {
    const bloomProgress = Math.min(progress, 1);
    petals.forEach(petal => {
        const scale = 0.1 + (petal.userData.originalScale - 0.1) * bloomProgress;
        petal.scale.set(scale, scale, scale);
        const distance = 0.8 * bloomProgress;
        petal.position.x = Math.cos(petal.userData.angle) * distance;
        petal.position.z = Math.sin(petal.userData.angle) * distance;
        petal.rotation.z = bloomProgress * 0.3;
    });
    const centerScale = 0.1 + 0.9 * bloomProgress;
    center.scale.set(centerScale, centerScale, centerScale);
}

function animateFlower() {
    requestAnimationFrame(animateFlower);
    flowerGroup.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animateFlower();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll-based bloom
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = window.scrollY / scrollHeight;
    updateFlowerBloom(scrollProgress);
});
