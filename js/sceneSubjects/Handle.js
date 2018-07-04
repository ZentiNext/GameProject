function Handle(scene,eventBus) {

	const radius = 2;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( 2, 0.5, 1 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));

	mesh.position.set(0, 0, -20);
	console.log(mesh);
	console.log(mesh.position);
	scene.add(mesh);

	var xSpeed = 0.1;
	var ySpeed = 0.1;

	this.update = function(time) {
		eventBus.post("keyboard",mesh);
	}
}
