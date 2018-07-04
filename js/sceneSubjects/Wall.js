function WallSide(scene,eventBus,side) {
  var width = 0;
  var height = 0;
  var x=0;
  var y=0;
  if (side=="left") {
    width = 0.4;
    height = 12.4;
    x=-10;
  } else if (side=="right") {
    width = 0.4;
    height = 12.4;
    x=10;
  } else if (side=="top") {
    width = 20;
    height = 0.4;
    y=6;
  }

	const depth = 0.1;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ), new THREE.MeshBasicMaterial( { color: 0xff0000 } ));
  console.log("wall");
  console.log(mesh);
	mesh.position.set(x, y, 0);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("collisionDetect",mesh);
	}
}

function Wall(scene,eventBus) {

	const mesh = new THREE.Mesh();

	mesh.position.set(0, 1, -20);

  const wallSubjects = [
    new WallSide(mesh,eventBus,"left"),
    new WallSide(mesh,eventBus,"right"),
    new WallSide(mesh,eventBus,"top")
  ];

	scene.add(mesh);



	this.update = function(time) {
    for(let i=0; i<wallSubjects.length; i++)
      wallSubjects[i].update(time);
	}
}
