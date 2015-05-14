var control = {
  speed: 1.5,
  rotationSpeed: .002
};

var gui = new dat.GUI();

var camera = gui.addFolder('Camera');

camera.add(control, 'speed', 0, 20).listen().name('Speed (up/down)');
camera.add(control, 'rotationSpeed', -0.025, 0.025).listen().name('Rotation (left/right)');
