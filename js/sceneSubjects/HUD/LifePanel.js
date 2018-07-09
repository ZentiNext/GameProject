function Life(scene,eventBus,life,player) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	var mesh=null;

	var colour1=new THREE.Color( 0xff0000 );
	var colour2=new THREE.Color( 0x0000ff );

	var texture = new THREE.TextureLoader().load( './images/ball.png');


	 // uniforms
	 var uniforms = {
			 color: { type: "c", value: colour1 }, // material is "red"
			 texture: { type: "t", value: texture },
	 };

	var material =new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
		fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
	} );

	texture.repeat.set(0.5, 0.5);
	texture.needsUpdate = true;
	material.transparent=true;

	if (player=="1") {
		mesh=new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), material);
		mesh.position.x=life*1+1;
	} else {
		mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), material);
		mesh.position.x=life*-1-1;
		mesh.material.uniforms.color.value=colour2;
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

	eventBus.subscribe("changeLifeColour",function(args) {
		var owner=args[0];
		var colour=new THREE.Color( args[1] );
    if (owner==player) {
      mesh.material.uniforms.color.value=colour;
    }
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

	eventBus.subscribe("removeLifePanel",function(playerPanel){
		console.log("remove Handle ");
		if(player==playerPanel){
			scene.remove(mesh);
		}
	});
	/* Event Bus - End */
}
