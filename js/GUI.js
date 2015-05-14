var control = {
  //motion
  speed: 6,
  rotationSpeed: .005,

  //scene
  SCALE_FACTOR: 1500,
  CAMERA_BOUND: 200,
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

  //VR
  vrSupported: false,
  vrEnabled: false,
  isFullscreen: false,
  fullScreenOrVR: function() {
    handleFSorVR();
  },

  //misc
  vidID: 'tKi9Z-f6qX4',
  toggleAbout: function() {
    if (document.getElementById('about').style.display == "block") {
      document.getElementById('about').style.display = "none";
    } else {
      document.getElementById('about').style.display = "block";
    }
  },
  toggleFPS: function() {
    if (showMeter) {
      meter.hide();
      showMeter = false;
    } else {
      meter.show();
      showMeter = true;
    }
  }

};

var gui = new dat.GUI({
  width: 300
});

gui.domElement.id = 'gui';

var motion = gui.addFolder('Motion');
motion.add(control, 'speed', 0, 20).listen().name('Speed [up]/[down]');
motion.add(control, 'rotationSpeed', -0.025, 0.025).listen().name('Rotation [left]/[right]');

var scene = gui.addFolder('Scene');
// scene.add(control, 'SCALE_FACTOR', 0, 4000).listen().name('Scale'); //This is just too buggy
scene.add(control, 'CAMERA_BOUND', 0, 800).listen().name('Orbit Freedom').onChange(control.initCamera);
scene.add(control, 'FOG_DENSITY', 0, 0.01).listen().name('Fog Density').onChange(control.initFog);
scene.add(control, 'newScene').name('New Scene');

var vr = gui.addFolder('VR');
vr.add(control, 'vrSupported').listen().name('WebVR Supported');
vr.add(control, 'fullScreenOrVR').name('Full Screen/VR [f]');

var misc = gui.addFolder('Misc');
misc.add(control, 'vidID').name('YouTube Video ID').onChange(function(value) {
  document.getElementById('youtubePlayer').setAttribute('src', 'https://www.youtube.com/embed/' + value + '?autoplay=1&VQ=HD720');
});
misc.add(control, 'toggleAbout').listen().name('Toggle Info & Credits');
misc.add(control, 'toggleFPS').listen().name('Toggle FPS');

motion.open();
scene.open();
vr.open();
misc.open();
