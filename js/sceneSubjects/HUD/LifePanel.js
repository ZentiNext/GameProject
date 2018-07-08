function Life(scene,eventBus,life,player) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	var mesh=null;


	if (player=="1") {
		mesh=new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xff0000} ));
		mesh.position.x=life*1+1;
	} else {
		mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0x0000ff} ));
		mesh.position.x=life*-1-1;
	}

	scene.add(mesh);
	this.update = function(time) {

	}

	/* Event Bus - Start */
  eventBus.subscribe("removeLife",function(args) {
		var lives=args[0];
		var owner=args[1];
    if (lives==life && owner==player) {
      scene.remove(mesh);
    }
  });
	eventBus.subscribe("removeAllLives",function(lives) {
      scene.remove(mesh);
  });
	/* Event Bus - End */
}

function LifePanel(scene,eventBus,player) {

	const mesh = new THREE.Mesh();

	mesh.position.set(0, -6.5, -20);
	scene.add(mesh);

	this.update = function(time) {

	}

	/* Event Bus - Start */
	eventBus.subscribe("lives",function(lives){
		for (var i = 0; i < lives; i++) {
			new Life(mesh,eventBus,i,player);
		}
	});
	/* Event Bus - End */
}
