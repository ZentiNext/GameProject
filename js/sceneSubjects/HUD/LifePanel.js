function Life(scene,eventBus,life) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	const mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xffff00} ));

	scene.add(mesh);
  mesh.position.x=life*-1;
	this.update = function(time) {

	}
  eventBus.subscribe("removeLife",function(lives) {
    if (lives==life) {
      scene.remove(mesh);
    }
  });
	eventBus.subscribe("removeAllLives",function(lives) {
      scene.remove(mesh);
  });
}

function LifePanel(scene,eventBus) {

	const mesh = new THREE.Mesh();

	mesh.position.set(13, -6.5, -20);
	scene.add(mesh);

  eventBus.subscribe("lives",function(lives){
    for (var i = 0; i < lives; i++) {
      new Life(mesh,eventBus,i);
    }
  });

	this.update = function(time) {

	}
}
