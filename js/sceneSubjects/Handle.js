function Handle(scene,eventBus,player) {

	const width = 2;
	const height = 0.4;
	const depth = 0.1;
	const y=-5;

	var texture = new THREE.TextureLoader().load( './images/playerWedge.png');
	 // uniforms
	 var uniforms = {
			 color: { type: "c", value: new THREE.Color( 0xff0000 ) }, // material is "red"
			 texture: { type: "t", value: texture },
	 };

	 if (player=="2") {
		 uniforms = {
  			 color: { type: "c", value: new THREE.Color( 0x0000ff ) }, // material is "blue"
  			 texture: { type: "t", value: texture },
  	 };
 	}
	var material =new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
		fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
	} );
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ), material);

	mesh.position.set(0, y+player/2, -20);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("keyboard"+player,mesh);
		eventBus.post("collisionDetect",[mesh,"handle"+player,time]);
		eventBus.post("isBallLost",y);
	}

	eventBus.subscribe("removeHandle",function(playerHandle){
		console.log("remove Handle ");
		if(player==playerHandle){
			scene.remove(mesh);
		}
	});

	eventBus.subscribe("changeHandleColour",function(args) {
		var owner=args[0];
		var colour=new THREE.Color( args[1] );
    if (owner==player) {
      mesh.material.uniforms.color.value=colour;
    }
  });
}
