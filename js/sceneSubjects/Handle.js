function Handle(scene,eventBus) {

	const width = 2;
	const height = 0.4;
	const depth = 0.1;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));

	mesh.position.set(0, -5, -20);
	scene.add(mesh);



	this.update = function(time) {
		eventBus.post("keyboard",mesh);
		eventBus.post("collisionDetect",[mesh,"handle"]);
		eventBus.post("isBallLost",mesh);
	}

}
