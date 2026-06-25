/* ============================================================
   NaiFan — 3D Interactive Scene
   Three.js + custom GLSL shaders (graphics/geometry aesthetic)
   ============================================================ */

(function () {
  'use strict';

  // --- Guard: bail out gracefully if WebGL is unavailable --------------
  if (typeof THREE === 'undefined') {
    console.warn('[scene] Three.js not loaded — 3D scene disabled.');
    return;
  }

  // --- DOM --------------------------------------------------------------
  const canvas = document.getElementById('scene-canvas');
  if (!canvas) return;

  // --- Renderer ---------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0a0a0f, 1);

  // --- Scene & Camera ---------------------------------------------------
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0f, 0.035);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 8);

  // --- Simplex Noise GLSL (Ashima Arts, public domain) -----------------
  const noiseGLSL = `
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
  `;

  // --- Central Icosahedron with custom ShaderMaterial -------------------
  const vertexShader = `
    ${noiseGLSL}
    uniform float uTime;
    uniform float uMouse;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vNoise;

    void main() {
      // Organic noise-based vertex displacement along normal
      float n = snoise(position * 0.8 + vec3(uTime * 0.3));
      float n2 = snoise(position * 2.0 - vec3(uTime * 0.15));
      vNoise = n + n2 * 0.3;

      vec3 displaced = position + normal * vNoise * (0.35 + uMouse * 0.2);
      vNormal = normalize(normalMatrix * normal);
      vPosition = displaced;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vNoise;

    void main() {
      // Fresnel rim lighting
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);

      // Base gradient based on noise value
      float t = vNoise * 0.5 + 0.5;
      vec3 baseColor = mix(uColorA, uColorB, t);

      // Rim glow
      vec3 rimColor = mix(uColorA, uColorB, fresnel);
      vec3 finalColor = baseColor * 0.3 + rimColor * fresnel * 2.5;

      // Subtle grid scanlines for "graphics" feel
      float grid = sin(vPosition.y * 30.0 + uTime * 2.0) * 0.5 + 0.5;
      finalColor += vec3(grid * 0.04);

      // Pulsing brightness
      float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
      finalColor *= pulse;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const icoGeometry = new THREE.IcosahedronGeometry(2, 64);
  const icoMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: 0 },
      uColorA: { value: new THREE.Color(0x00d4ff) }, // cyan
      uColorB: { value: new THREE.Color(0xb14aed) }, // purple
    },
  });
  const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
  scene.add(icosahedron);

  // --- Wireframe overlay -----------------------------------------------
  const wireGeometry = new THREE.IcosahedronGeometry(2.3, 3);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
  scene.add(wireframe);

  // --- Particle field ---------------------------------------------------
  const particleCount = 1500;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  const colorPalette = [
    new THREE.Color(0x00d4ff), // cyan
    new THREE.Color(0xb14aed), // purple
    new THREE.Color(0xffffff), // white
    new THREE.Color(0x00d4ff),
    new THREE.Color(0xb14aed),
  ];

  for (let i = 0; i < particleCount; i++) {
    // Distribute in a spherical shell
    const radius = 4 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    particleColors[i * 3] = color.r;
    particleColors[i * 3 + 1] = color.g;
    particleColors[i * 3 + 2] = color.b;

    particleSizes[i] = Math.random() * 2 + 0.5;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // --- Lighting ---------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 1);
  scene.add(ambientLight);

  const light1 = new THREE.PointLight(0x00d4ff, 2, 20);
  light1.position.set(5, 3, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xb14aed, 2, 20);
  light2.position.set(-5, -3, 5);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xffffff, 0.5, 15);
  light3.position.set(0, 5, -5);
  scene.add(light3);

  // --- Interaction: manual orbit controls ------------------------------
  // Using spherical coordinates for smooth camera orbit
  const orbit = {
    radius: 8,
    theta: 0,      // horizontal angle
    phi: Math.PI / 2, // vertical angle
    targetRadius: 8,
    targetTheta: 0,
    targetPhi: Math.PI / 2,
    autoRotate: true,
    autoRotateSpeed: 0.15,
  };

  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let mouseIdleTimer = null;
  let mouseXNorm = 0;
  let mouseYNorm = 0;

  canvas.addEventListener('mousedown', function (e) {
    isDragging = true;
    orbit.autoRotate = false;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', function (e) {
    // Normalized mouse position for parallax (-1 to 1)
    mouseXNorm = (e.clientX / window.innerWidth) * 2 - 1;
    mouseYNorm = (e.clientY / window.innerHeight) * 2 - 1;

    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      orbit.targetTheta -= deltaX * 0.005;
      orbit.targetPhi -= deltaY * 0.005;

      // Clamp phi to avoid flipping
      orbit.targetPhi = Math.max(0.3, Math.min(Math.PI - 0.3, orbit.targetPhi));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      // Reset auto-rotate timer
      clearTimeout(mouseIdleTimer);
      mouseIdleTimer = setTimeout(function () {
        orbit.autoRotate = true;
      }, 3000);
    }
  });

  window.addEventListener('mouseup', function () {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });

  // Touch support
  canvas.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      isDragging = true;
      orbit.autoRotate = false;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', function (e) {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      orbit.targetTheta -= deltaX * 0.005;
      orbit.targetPhi -= deltaY * 0.005;
      orbit.targetPhi = Math.max(0.3, Math.min(Math.PI - 0.3, orbit.targetPhi));

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      clearTimeout(mouseIdleTimer);
      mouseIdleTimer = setTimeout(function () {
        orbit.autoRotate = true;
      }, 3000);
    }
  }, { passive: true });

  canvas.addEventListener('touchend', function () {
    isDragging = false;
  }, { passive: true });

  // Wheel zoom
  canvas.addEventListener('wheel', function (e) {
    e.preventDefault();
    orbit.targetRadius += e.deltaY * 0.01;
    orbit.targetRadius = Math.max(4, Math.min(15, orbit.targetRadius));
  }, { passive: false });

  canvas.style.cursor = 'grab';

  // --- Resize handler ---------------------------------------------------
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, 100);
  });

  // --- Visibility: pause when tab hidden --------------------------------
  let isVisible = true;
  document.addEventListener('visibilitychange', function () {
    isVisible = !document.hidden;
  });

  // --- Animation loop ---------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    const elapsed = clock.getElapsedTime();

    // Auto-rotate
    if (orbit.autoRotate) {
      orbit.targetTheta += orbit.autoRotateSpeed * 0.01;
    }

    // Smooth interpolation
    orbit.radius += (orbit.targetRadius - orbit.radius) * 0.08;
    orbit.theta += (orbit.targetTheta - orbit.theta) * 0.08;
    orbit.phi += (orbit.targetPhi - orbit.phi) * 0.08;

    // Update camera position from spherical coordinates
    camera.position.x = orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);
    camera.position.y = orbit.radius * Math.cos(orbit.phi);
    camera.position.z = orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);
    camera.lookAt(0, 0, 0);

    // Update shader uniforms
    icoMaterial.uniforms.uTime.value = elapsed;
    icoMaterial.uniforms.uMouse.value = isDragging ? 1 : 0;

    // Rotate geometry
    icosahedron.rotation.y = elapsed * 0.15;
    icosahedron.rotation.x = elapsed * 0.08;
    wireframe.rotation.y = elapsed * 0.1;
    wireframe.rotation.x = elapsed * 0.05;

    // Rotate particle field slowly + parallax
    particles.rotation.y = elapsed * 0.03;
    particles.rotation.x = mouseYNorm * 0.1;
    particles.rotation.z = mouseXNorm * 0.05;

    // Orbit lights
    light1.position.x = Math.cos(elapsed * 0.5) * 6;
    light1.position.z = Math.sin(elapsed * 0.5) * 6;
    light2.position.x = Math.cos(elapsed * 0.5 + Math.PI) * 6;
    light2.position.z = Math.sin(elapsed * 0.5 + Math.PI) * 6;

    renderer.render(scene, camera);
  }

  animate();

  // --- Fade out loading indicator ---------------------------------------
  const loader = document.getElementById('scene-loader');
  if (loader) {
    setTimeout(function () {
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.style.display = 'none';
      }, 500);
    }, 800);
  }
})();
