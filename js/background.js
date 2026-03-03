let camera;
let scene;
let renderer;
let torusGroup;
let mousePos = new THREE.Vector2();

function init() {
    const canvas = document.getElementById('renderCanvas');

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(0, -2, 3.5);

    scene = new THREE.Scene();

    const torusGeometry = new THREE.TorusGeometry(7, 0.5, 3, 12);
    const torusMaterial = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color(0x696969)
    });

    torusGroup = new THREE.Group();
    scene.add(torusGroup);

    for (let i = 0; i < 4; ++i) {
        const mesh = new THREE.Mesh(torusGeometry, torusMaterial);
        mesh.position.z = -0.7 * i * i - i * 2;

        torusGroup.add(mesh);
    }

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
    renderer.setAnimationLoop(animation);

    const $menuToggleMobile = document.getElementById('menu-toggle-mobile');

    var canvasEnabled = true;

    $menuToggleMobile.addEventListener('click', function () {
        canvasEnabled = !canvasEnabled;
        canvas.style.display = canvasEnabled ? 'block' : 'none';
    }, false);
}

function animation(time) {
    for (let i = 0; i < torusGroup.children.length; ++i) {
        const child = torusGroup.children[i];

        child.rotation.z = time * 0.00002 * (i % 2 == 0 ? 1 : -1);

        const counterI = (torusGroup.children.length - i) * 0.2;
        child.position.x += ((mousePos.x * counterI) - child.position.x) * 0.01;
        child.position.y += ((-mousePos.y * counterI) - child.position.y) * 0.01;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(e) {
    mousePos = new THREE.Vector2(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
}

init();
