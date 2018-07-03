function Handle(scene) {

	const radius = 2;
	const handle = new THREE.Mesh(new THREE.BoxGeometry( 2, 0.5, 1 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));

	handle.position.set(0, 0, -20);

	scene.add(handle);

	var xSpeed = 0.1;
	var ySpeed = 0.1;

	Keys={
		'left'		: 37,
		'up'		: 38,
		'right'		: 39,
		'down'		: 40,
		'space'		: 32,
		'pageup'	: 33,
		'pagedown'	: 34,
		'tab'		: 9
	}
	document.addEventListener("keydown", onDocumentKeyDown, false);
	function onDocumentKeyDown(event) {
	    var keyCode = event.which;
	    if (keyCode == 87) {
	        handle.position.y += ySpeed;
	    } else if (keyCode == 83) {
	        handle.position.y -= ySpeed;
	    } else if (keyCode == 65) {
	        handle.position.x -= xSpeed;
	    } else if (keyCode == 68) {
	        handle.position.x += xSpeed;
	    } else if (keyCode == 32) {
	        handle.position.set(0, 0, 0);
	    }
	};

	this.update = function(time) {
		//const scale = Math.sin(time)+2;
		//mesh.rotation.x += 0.01;
		//mesh.rotation.y += 0.01;
		//mesh.scale.set(scale, scale, scale);
	}
}
