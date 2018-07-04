function Ball(scene,eventBus) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	const mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xffff00} ));

  var linearVelocity = new THREE.Vector3(0.1,-0.1,0);
  var angularVelocity = new THREE.Vector3(1,1,0);

	mesh.position.set(0, 5, -20);
	scene.add(mesh);

  eventBus.subscribe("handle",function(handle){
    if(mesh.position.y<=handle.position.y+(handle.geometry.parameters.height)/2+radius+handle.geometry.parameters.depth){
      linearVelocity.y=+0.1;
    }
  })

	this.update = function(time) {
      mesh.position.y += linearVelocity.y;

	}

}
