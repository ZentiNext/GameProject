function SceneSubject(scene) {
	
	const radius = 2;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));

	mesh.position.set(0, 0, -20);

	scene.add(mesh);
	
	this.update = function(time) {
		//const scale = Math.sin(time)+2;
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.01;
		//mesh.scale.set(scale, scale, scale);
	}
}