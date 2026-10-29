
(function () {
  /* ------------------------------------------------------------------
     EDIT HERE
     href  : where the logo goes when clicked (page, plan filter, social profile)
     img   : ISP logo (transparent PNG/SVG). Replace the data: URI with your own file, e.g. "/img/dialog.png"
     pos   : [x%, y%] position on desktop;  mpos : on phones
     ------------------------------------------------------------------ */
  var ITEMS = []; // Store home keeps the original lamp without floating logos.
  /* ---------------------------------------------------------------- */

  var root = document.getElementById('lh');
  if (!root) return;
  var media = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var paused = media.matches, visible = true, lost = false, frameId = 0;
  var toggle = document.getElementById('lhToggle'), motion = document.getElementById('lhMotion');
  var environmentTarget;
  root.dataset.motion = paused ? 'paused' : 'active';
  var poolEl = document.getElementById('lhPool'), groundEl = document.getElementById('lhGround');
  // A viewport-sized transparent layer lets the glow cross the hero boundary
  // without creating page overflow or a rectangular cutoff.
  var glowLayer = document.createElement('div');
  glowLayer.className = 'lh-glow-layer';
  glowLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glowLayer);
  glowLayer.appendChild(poolEl);
  var list = document.getElementById('lhItems');
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var smooth01 = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  // ----- build logo items -----
  var items = ITEMS.map(function (d, i) {
    var li = document.createElement('li'); li.className = 'lh__item';
    var fl = document.createElement('div'); fl.className = 'lh__float';
    fl.style.setProperty('--dur', (12 + (i * 1.37) % 6).toFixed(2) + 's');
    fl.style.setProperty('--delay', (-(i * 0.9) % 5).toFixed(2) + 's');
    fl.style.setProperty('--fx', (5 + (i * 7) % 4) + 'px');
    fl.style.setProperty('--fy', (7 + (i * 5) % 5) + 'px');
    var a = document.createElement('a'); a.className = 'lh__link'; a.href = d.href;
    a.setAttribute('aria-label', d.name + (d.note ? ' ' + d.note : ''));
    if (d.kind === 'isp') {
      a.addEventListener('click', function () {
        var all = document.querySelector('[data-network="all"]');
        if (all) all.click();
        var input = document.getElementById('package-search');
        if (input) { input.value = d.search; input.dispatchEvent(new Event('input', { bubbles: true })); }
      });
    }
    if (/^https?:/.test(d.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    var art;
    if (d.kind === 'isp') {
      art = document.createElement('img'); art.className = 'lh__art lh__isp'; art.src = d.img; art.alt = ''; art.draggable = false;
      art.style.setProperty('--w', d.w + 'px');
    } else {
      art = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      art.setAttribute('viewBox', '0 0 24 24'); art.setAttribute('class', 'lh__art lh__soc'); art.setAttribute('aria-hidden', 'true');
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d.path); art.appendChild(p);
      art.style.setProperty('--brand', d.brand);
    }
    var lab = document.createElement('span'); lab.className = 'lh__label'; lab.textContent = d.note ? d.name + ' · ' + d.note : d.name;
    a.appendChild(art); a.appendChild(lab); fl.appendChild(a); li.appendChild(fl); list.appendChild(li);
    var it = { d: d, li: li, a: a, v: 0, hover: false, x: 0, y: 0 };
    a.addEventListener('pointerenter', function () { it.hover = true; requestFrame(); });
    a.addEventListener('pointerleave', function () { it.hover = false; requestFrame(); });
    a.addEventListener('focus', function () {
      it.hover = true;
      if (ptr && !paused) { ptr.x = it.x; ptr.y = it.y; ptr.active = true; ptr.last = now; }
      requestFrame();
    });
    a.addEventListener('blur', function () { it.focused = false; requestFrame(); });
    return it;
  });

  // Position links even when 3D is unavailable.
  function layoutItems() {
    var r = root.getBoundingClientRect(), compact = r.width < 720;
    var width = Math.max(1,r.width), height = Math.max(1,r.height);
      root.dataset.layout = compact ? "compact" : "wide";
    items.forEach(function(it) {
      var position = width >= 440 && compact ? it.d.cpos : (compact ? it.d.mpos : it.d.pos);
      it.x = position[0] / 100 * width; it.y = position[1] / 100 * height;
      it.li.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px)';
      var art = it.a.querySelector('.lh__art');
      var logoWidth = compact ? Math.min(it.d.w * (width < 400 ? 0.6 : 0.76), 104) : it.d.w;
      var linkWidth = it.d.kind === 'isp' ? logoWidth + 10 : Math.min(94, width * 0.25);
      it.x=clamp(it.x,linkWidth/2+12,width-linkWidth/2-12);
      it.li.style.transform='translate('+it.x+'px,'+it.y+'px)';
      it.a.style.width = linkWidth + 'px';
      art.style.setProperty('--w', (it.d.kind === 'isp' ? logoWidth : (compact ? 32 : 40)) + 'px');
    });
  }
  layoutItems();
  window.addEventListener('resize', layoutItems, { passive: true });
  var linkObserver;
  if ('ResizeObserver' in window) { linkObserver = new ResizeObserver(layoutItems); linkObserver.observe(root); }

  // ----- renderer -----
  var renderer;
  try {
    if (typeof THREE === 'undefined') throw new Error('no three');
    renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    root.classList.add('lh--fallback');glowLayer.hidden=true;
    root.dataset.motion = 'paused';
    document.getElementById('lhNoGL').hidden = false;
    if(toggle)toggle.disabled=true;if(motion)motion.disabled=true;
    items.forEach(function (it) { it.a.style.setProperty('--e', 1); });
    return;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.physicallyCorrectLights = true;
  root.insertBefore(renderer.domElement, root.firstChild);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
  var WALL_Z = -4.6;
  var wallPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  wallPlane.constant = -WALL_Z;  // plane z = WALL_Z

  // ----- reflections so the metal reads on black -----
  (function () {
    var pm = new THREE.PMREMGenerator(renderer), env = new THREE.Scene();
    env.background = new THREE.Color(0x040404);
    function panel(w, h, x, y, z, k, col) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
    }
    panel(10, 6, 0, 7, 5, 3.2, 0xffffff);
    panel(3, 12, -8, 2, 3, 2.2, 0xcddcff);
    panel(3, 12, 8, 2, 1, 2.6, 0xffd9a8);
    panel(12, 4, 0, 1, -8, 1.6, 0xffe2c0);
    environmentTarget = pm.fromScene(env, 0.03); scene.environment = environmentTarget.texture;
    env.traverse(function(object) { if(object.geometry) object.geometry.dispose(); if(object.material) object.material.dispose(); });
    pm.dispose();
  })();

  // ----- materials -----
  var graphite = new THREE.MeshStandardMaterial({ color: 0x24262b, roughness: 0.34, metalness: 0.85 });
  var brass = new THREE.MeshStandardMaterial({ color: 0xc19a58, roughness: 0.3, metalness: 1.0 });
  var enamel = new THREE.MeshStandardMaterial({ color: 0xe6dfd0, roughness: 0.42, metalness: 0.1 });
  var inner = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0, side: THREE.BackSide, emissive: new THREE.Color(0xffedc4), emissiveIntensity: 1.8 });

  // ----- lamp -----
  var BASE = new THREE.Vector3(0, 0, 0);
  var lamp = new THREE.Group(); lamp.position.copy(BASE); scene.add(lamp);

  var disc = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.14, 64), graphite); disc.position.y = 0.07; lamp.add(disc);
  var ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.026, 12, 64), brass); ring.rotation.x = Math.PI / 2; ring.position.y = 0.145; lamp.add(ring);
  var stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.24, 28), graphite); stem.position.y = 0.26; lamp.add(stem);

  var L1 = 1.75, L2 = 1.75, SH = 0.34;
  function makeArm(len) {
    var arm = new THREE.Group();
    [-0.085, 0.085].forEach(function (z) {
      var g = new THREE.CylinderGeometry(0.028, 0.028, len, 14); g.translate(0, len / 2, 0); g.rotateZ(-Math.PI / 2);
      var r = new THREE.Mesh(g, graphite); r.position.z = z; arm.add(r);
    });
    var pts = [];
    for (var i = 0; i <= 260; i++) { var u = i / 260, a = u * Math.PI * 2 * 28; pts.push(new THREE.Vector3(0.22 + u * (len - 0.44), Math.cos(a) * 0.05, Math.sin(a) * 0.05)); }
    arm.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), coarse ? 260 : 520, 0.0085, 5, false), brass));
    lamp.add(arm); return arm;
  }
  var arm1 = makeArm(L1), arm2 = makeArm(L2);
  function joint(r) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 18), brass); lamp.add(m); return m; }
  var jS = joint(0.12), jE = joint(0.11), jP = joint(0.1); jS.position.set(0, SH, 0);

  // head lives in world space so it can look straight at the light target
  var head = new THREE.Group(); scene.add(head);
  var pivot = new THREE.Group(); pivot.rotation.y = -Math.PI / 2; head.add(pivot);   // shade axis +X -> head +Z
  var shGeo = new THREE.CylinderGeometry(0.6, 0.21, 0.95, 64, 1, true); shGeo.rotateZ(-Math.PI / 2);
  var shOut = new THREE.Mesh(shGeo, enamel), shIn = new THREE.Mesh(shGeo, inner);
  shOut.position.x = shIn.position.x = 0.36; pivot.add(shOut, shIn);
  var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.1, 40), graphite); cap.rotation.z = Math.PI / 2; cap.position.x = -0.12; pivot.add(cap);
  var lip = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.02, 12, 64), brass); lip.rotation.y = Math.PI / 2; lip.position.x = 0.84; pivot.add(lip);
  var bulbMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 28, 18), bulbMat); bulb.position.x = 0.42; pivot.add(bulb);

  function glowTex() {
    var c = document.createElement('canvas'); c.width = c.height = 128; var g = c.getContext('2d');
    var gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,237,196,1)'); gr.addColorStop(.25, 'rgba(255,237,196,.60)'); gr.addColorStop(1, 'rgba(255,237,196,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
  }
  var glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
  glow.position.x = 0.9; glow.scale.set(1.7, 1.7, 1); pivot.add(glow);

  var bulbLight = new THREE.PointLight(0xffedc4, 28, 10, 2); bulbLight.position.x = 0.5; pivot.add(bulbLight);

  // soft key / rim lights so the metal and enamel read against black
  var key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(3, 7, 8); scene.add(key);
  var rimL = new THREE.DirectionalLight(0x9db4ff, 1.4); rimL.position.set(-6, 4, -3); scene.add(rimL);
  var rimR = new THREE.DirectionalLight(0xffffff, 1.1); rimR.position.set(6, 3, -2); scene.add(rimR);

  // visible beam
  var bgeo = new THREE.ConeGeometry(1, 1, 56, 1, true); bgeo.translate(0, -0.5, 0); bgeo.rotateZ(Math.PI / 2); bgeo.rotateY(-Math.PI / 2);
  var beamMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { uOp: { value: 1 }, uColor: { value: new THREE.Color(1.0, 0.93, 0.77) } },
    vertexShader: 'varying float vZ; varying vec3 vN; varying vec3 vV; void main(){ vZ = position.z; vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
    fragmentShader: 'uniform float uOp; uniform vec3 uColor; varying float vZ; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(abs(dot(normalize(vN), normalize(vV))), 1.6); float a = uOp*pow(clamp(1.0-vZ,0.0,1.0),1.1)*f*0.36; gl_FragColor = vec4(uColor*a, a); }'
  });
  var beamPivot = new THREE.Object3D(), beam = new THREE.Mesh(bgeo, beamMat); beamPivot.add(beam); scene.add(beamPivot);

  // ----- layout -----
  var W = 1, H = 1, bounds = { x0: -8, x1: 8, y0: 0.8, y1: 6 }, ray = new THREE.Raycaster(), tmpV = new THREE.Vector3(), mobile = false;
  var SPOT_ANGLE = 0.36;

  function wallPoint(ndcX, ndcY, out) { ray.setFromCamera({ x: ndcX, y: ndcY }, camera); return ray.ray.intersectPlane(wallPlane, out); }
  function project(v, out) { tmpV.copy(v).project(camera); out.x = (tmpV.x * 0.5 + 0.5) * W; out.y = (-tmpV.y * 0.5 + 0.5) * H; return out; }

  function resize() {
    var r = root.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    mobile = W < 720;
    renderer.setSize(W, H, false); renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
    camera.aspect = W / H;
    var dist = mobile ? 14.5 : 11.2;
    camera.position.set(0, 3.0, dist); camera.lookAt(0, mobile ? 2.9 : 2.7, -3);
    camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
    var a = new THREE.Vector3(), b = new THREE.Vector3();
    wallPoint(-0.92, -0.55, a); wallPoint(0.92, 0.8, b);
    bounds = { x0: Math.min(a.x, b.x), x1: Math.max(a.x, b.x), y0: Math.max(0.9, Math.min(a.y, b.y)), y1: Math.max(a.y, b.y) };
    layoutItems();
    var base = project(BASE, { x: 0, y: 0 }), gw = W * (mobile ? 0.5 : 0.22);
    groundEl.style.width = gw + 'px'; groundEl.style.height = gw * 0.28 + 'px';
    groundEl.style.transform = 'translate(' + (base.x - gw / 2) + 'px,' + (base.y - gw * 0.14) + 'px)';
    items.forEach(function (it) { it.a.style.setProperty('--e', 0); });
    requestFrame();
  }
  window.addEventListener('resize', resize, { passive: true });
  var resizeObserver;
  if (window.ResizeObserver) { resizeObserver = new ResizeObserver(resize); resizeObserver.observe(root); }
  resize();

  // ----- input -----
  var ptr = { x: 0, y: 0, clientX: 0, clientY: 0, pointer: false, active: false }, goal = new THREE.Vector3(0, 3, WALL_Z), target = goal.clone(), hitV = new THREE.Vector3();
  var on = true, power = 1, now = 0;
  function updatePointer(e) {
    if(paused || !visible || document.hidden) return;
    if(e.pointerType === "touch" && !root.contains(e.target)) return;
    var r = root.getBoundingClientRect();
    ptr.clientX = e.clientX; ptr.clientY = e.clientY; ptr.pointer = true;
    ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.active = true;
    requestFrame();
  }
  document.addEventListener('pointermove', updatePointer, { passive: true });
  document.addEventListener('pointerdown', updatePointer, { passive: true });
  function releaseTouch(e){if(e.pointerType==='touch'){ptr.active=false;ptr.pointer=false;requestFrame();}}
  document.addEventListener('pointerup',releaseTouch,{passive:true});
  document.addEventListener('pointercancel',releaseTouch,{passive:true});
  document.documentElement.addEventListener('pointerleave', function () { ptr.active = false; });
  window.addEventListener('scroll', function () {
    if(ptr.active && ptr.pointer)updatePointer({clientX:ptr.clientX,clientY:ptr.clientY});
    requestFrame();
  }, {passive:true});
  function setOn(value) {
    on=value;if(toggle){toggle.setAttribute('aria-pressed',String(on));toggle.textContent=on?'Light on':'Light off';}requestFrame();
  }
  root.addEventListener('click', function (e) { if (!e.target.closest('.lh__link, button')) setOn(!on); });
  if(toggle)toggle.addEventListener('click',function(){setOn(!on);});
  function syncMotion() {
    root.dataset.motion=paused?'paused':'active';
    if(motion){motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Enable movement':'Pause movement';}requestFrame();
  }
  if(motion)motion.addEventListener('click',function(){paused=!paused;syncMotion();});
  media.addEventListener('change',function(){paused=media.matches;syncMotion();});
  root.addEventListener('keydown',function(e){
    if(e.target!==root)return;
    if(e.code==='Space'){e.preventDefault();setOn(!on);return;}
    if(e.key.toLowerCase()==='p'){e.preventDefault();paused=!paused;syncMotion();return;}
    if(paused || ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].indexOf(e.key)<0)return;
    e.preventDefault();
    if(!ptr.active){ptr.x=W*0.5;ptr.y=H*0.5;}
    if(e.key==='Home'){ptr.x=W*0.5;ptr.y=H*0.5;}
    if(e.key==='ArrowLeft')ptr.x-=W*0.06;if(e.key==='ArrowRight')ptr.x+=W*0.06;
    if(e.key==='ArrowUp')ptr.y-=H*0.06;if(e.key==='ArrowDown')ptr.y+=H*0.06;
    ptr.x=clamp(ptr.x,0,W);ptr.y=clamp(ptr.y,0,H);ptr.pointer=false;ptr.active=true;requestFrame();
  });

  function aim() {
    if (ptr.active) {
      if(wallPoint(ptr.x / W * 2 - 1, -(ptr.y / H) * 2 + 1, hitV)) {
        goal.set(clamp(hitV.x, -40, 40), clamp(hitV.y, -30, 40), WALL_Z);
      }
    } else {
      var t = now;
      goal.set((bounds.x0 + bounds.x1) / 2 + Math.sin(t * 0.52) * (bounds.x1 - bounds.x0) * 0.42,
               (bounds.y0 + bounds.y1) / 2 + 0.3 + Math.sin(t * 0.83 + 1.2) * (bounds.y1 - bounds.y0) * 0.36, WALL_Z);
    }
  }

  // ----- lamp pose -----
  var tmp = new THREE.Vector3(), yaw = 0, hp = new THREE.Vector3(), headW = new THREE.Vector3(), sp = { x: 0, y: 0 }, sr = { x: 0, y: 0 };
  function pose() {
    tmp.copy(target).sub(BASE);
    var d = Math.max(Math.hypot(tmp.x, tmp.z), 1);
    var a = Math.atan2(-tmp.z, tmp.x);
    while (a - yaw > Math.PI) a -= Math.PI * 2; while (a - yaw < -Math.PI) a += Math.PI * 2;
    yaw = a; lamp.rotation.y = yaw;

    var h = clamp(d * 0.2, 0.55, 1.75), py = 2.55 + clamp((target.y - 3) * 0.1, -0.25, 0.4);
    var dx = h, dy = py - SH, D = Math.hypot(dx, dy), maxD = L1 + L2 - 0.03;
    if (D > maxD) { dx *= maxD / D; dy *= maxD / D; D = maxD; h = dx; py = SH + dy; }
    var base = Math.atan2(dy, dx), A = Math.acos(clamp((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
    var a1 = base + A, ex = L1 * Math.cos(a1), ey = SH + L1 * Math.sin(a1), a2 = Math.atan2(py - ey, h - ex);
    arm1.position.set(0, SH, 0); arm1.rotation.z = a1; arm2.position.set(ex, ey, 0); arm2.rotation.z = a2;
    jE.position.set(ex, ey, 0); jP.position.set(h, py, 0);
    lamp.updateMatrixWorld(true);
    headW.set(h, py, 0); lamp.localToWorld(headW);
    head.position.copy(headW); head.lookAt(target); head.updateMatrixWorld(true);

    pivot.getWorldPosition(hp); hp.add(tmp.set(0, 0, 0));
    beamPivot.position.copy(headW); beamPivot.lookAt(target);
    var len = headW.distanceTo(target), rad = len * Math.tan(SPOT_ANGLE);
    beam.scale.set(rad * 0.97, rad * 0.97, len);

    // light pool + reveal radius in screen space
    project(target, sp);
    tmp.set(target.x + rad, target.y, target.z); project(tmp, sr);
    return { x: sp.x, y: sp.y, r: Math.abs(sr.x - sp.x) * 1.15 };
  }

  // ----- visibility-aware loop -----
  var clock = new THREE.Clock();
  function requestFrame() {
    if(renderer && clock && !frameId && visible && !document.hidden && !lost)frameId=requestAnimationFrame(frame);
  }
  var observer;
  if(window.IntersectionObserver){observer=new IntersectionObserver(function(entries){
    visible=entries[0].isIntersecting;root.dataset.visible=String(visible);glowLayer.hidden=!visible;
    if(visible)requestFrame();else{cancelAnimationFrame(frameId);frameId=0;}
  },{threshold:0});observer.observe(root);}
  document.addEventListener('visibilitychange',function(){
    root.dataset.visible=String(!document.hidden);glowLayer.hidden=document.hidden || !visible;
    if(document.hidden){cancelAnimationFrame(frameId);frameId=0;}else requestFrame();
  });
  var lastMobileFrame = -Infinity;
  function frame(timestamp) {
    frameId=0;if(!visible || document.hidden || lost)return;
    if(coarse && typeof timestamp === "number"){
      if(timestamp-lastMobileFrame<32){requestFrame();return;}
      lastMobileFrame=timestamp;
    }
    var dt=Math.min(clock.getDelta(),0.05);now+=dt;
    if(!paused){aim();target.lerp(goal,1-Math.exp(-dt*4.5));}
    var L=pose();
    power=paused?(on?1:0):power+((on?1:0)-power)*(1-Math.exp(-dt*8));
    bulbLight.intensity=28*power;inner.emissiveIntensity=1.8*power;glow.material.opacity=power;
    bulbMat.color.setRGB(0.16+0.84*power,0.15+0.78*power,0.13+0.64*power);beamMat.uniforms.uOp.value=power;
    var pr=Math.min(L.r*1.25,Math.max(W,H)*0.8);
    var screenRect=root.getBoundingClientRect();
    poolEl.style.width=poolEl.style.height=pr*2+'px';
    poolEl.style.transform='translate('+(screenRect.left+L.x-pr)+'px,'+(screenRect.top+L.y-pr)+'px)';poolEl.style.opacity=power.toFixed(3);
    groundEl.style.opacity=(0.35+0.65*power).toFixed(3);
    var fading=false;
    items.forEach(function(it){
      var distance=Math.hypot(it.x-L.x,it.y-L.y);
      var lit=smooth01(L.r*1.05,L.r*0.35,distance)*power;
      var value=Math.max(lit,it.focused?1:0);
      it.v=paused?value:it.v+(value-it.v)*(1-Math.exp(-dt*(value>it.v?9:3.2)));
      if(Math.abs(value-it.v)>0.002)fading=true;
      it.a.style.setProperty('--e',it.v.toFixed(3));
    });
    renderer.render(scene,camera);
    if(!paused || fading || Math.abs(power-(on?1:0))>0.001)requestFrame();
  }
  renderer.domElement.setAttribute('aria-hidden','true');
  renderer.domElement.addEventListener('webglcontextlost',function(e){
    e.preventDefault();lost=true;cancelAnimationFrame(frameId);frameId=0;root.classList.add('lh--fallback');
    document.getElementById('lhNoGL').hidden=false;if(toggle)toggle.disabled=true;if(motion)motion.disabled=true;
  });
  renderer.domElement.addEventListener('webglcontextrestored',function(){
    lost=false;glowLayer.hidden=!visible;root.classList.remove('lh--fallback');document.getElementById('lhNoGL').hidden=true;
    if(toggle)toggle.disabled=false;if(motion)motion.disabled=false;requestFrame();
  });
  window.addEventListener('pagehide',function(e){
    if(e.persisted)return;
    cancelAnimationFrame(frameId);observer&&observer.disconnect();resizeObserver&&resizeObserver.disconnect();linkObserver&&linkObserver.disconnect();
    var geometries=new Set(),materials=new Set(),textures=new Set();
    scene.traverse(function(object){if(object.geometry)geometries.add(object.geometry);if(object.material)materials.add(object.material);});
    geometries.forEach(function(g){g.dispose();});materials.forEach(function(m){if(m.map)textures.add(m.map);m.dispose();});
    glowLayer.remove();
    textures.forEach(function(t){t.dispose();});environmentTarget&&environmentTarget.dispose();renderer.dispose();
  });
  syncMotion();requestFrame();
})();
