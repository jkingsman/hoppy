var control = {
  speed: 1.5,
  rotationSpeed: .002,

  SCALE_FACTOR: 1500,
  CAMERA_BOUND: 300,
  initCamera: function() {
    camera = new THREE.PerspectiveCamera(60, renderTargetWidth / renderTargetHeight, 1, 3 * control.SCALE_FACTOR);
    camera.position.set(0, 0, control.SCALE_FACTOR / 2);
  },
  FOG_DENSITY: 0.0012,
  initFog: function() {
    scene.fog = new THREE.FogExp2(0x000000, control.FOG_DENSITY);
  },
  newScene: function() {
    init();
    render();
  },

  vrSupported: false,
  vrEnabled: false,
  isFullscreen: false,
  fullScreenOrVR: function() {
    handleFSorVR();
  },

  toggleAbout: function() {
    if (document.getElementById('about').style.display == "block") {
      document.getElementById('about').style.display = "none";
    } else {
      document.getElementById('about').style.display = "block";
    }
  }

};

var gui = new dat.GUI({
  width: 300
});

var motion = gui.addFolder('Motion');
motion.add(control, 'speed', 0, 20).listen().name('Speed (up/down)');
motion.add(control, 'rotationSpeed', -0.025, 0.025).listen().name('Rotation (left/right)');

var scene = gui.addFolder('Scene');
// scene.add(control, 'SCALE_FACTOR', 0, 4000).listen().name('Scale'); //This is just too buggy
scene.add(control, 'CAMERA_BOUND', 0, 800).listen().name('Orbit Freedom').onChange(control.initCamera);
scene.add(control, 'FOG_DENSITY', 0, 0.01).listen().name('Fog Density').onChange(control.initFog);
scene.add(control, 'newScene').name('New Scene');

var vr = gui.addFolder('VR');
vr.add(control, 'vrSupported').listen().name('WebVR Supported');
vr.add(control, 'fullScreenOrVR').name('Full Screen/VR (f)');

var about = gui.addFolder('About');
about.add(control, 'toggleAbout').listen().name('Information & Credits');

motion.open();
scene.open();
vr.open();
about.open();
