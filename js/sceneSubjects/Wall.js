function WallSide(scene,eventBus,side) {
  var width = 0;
  var height = 0;
  var x=0;
  var y=1;
  var texture = null;
  var material = null;
  if (side=="left") {
    width = 2;
    height = 12.4;
    x=-10;
    texture = new THREE.TextureLoader().load( './images/rockSlabLeft.png');
    material = new THREE.MeshBasicMaterial( { map: texture } );
  } else if (side=="right") {
    width = 2;
    height = 12.4;
    x=10;
    texture = new THREE.TextureLoader().load( './images/rockSlabRight.png');
    material = new THREE.MeshBasicMaterial( { map: texture } );
  } else if (side=="top") {
    width = 22;
    height = 2.4;
    y=7;
    texture = new THREE.TextureLoader().load( './images/rockSlabTop.png');
    material = new THREE.MeshBasicMaterial( { map: texture } );
  }

	const depth = 0.1;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ), material);
  console.log("wall");
  console.log(mesh);
	mesh.position.set(x, y, 0);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("collisionDetect",[mesh,"wall "+side,time]);
	}
}

function Wall(scene,eventBus) {

	const mesh = new THREE.Mesh();

	mesh.position.set(0, 0, -20);

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
