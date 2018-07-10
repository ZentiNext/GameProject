function Ball(scene,eventBus) {
	const radius = .5;
  	const widthSegments = 20;
  	const heightSegments = 20;
  	const acceleration = 0.01;

	var colour1=new THREE.Color( 0xff0000 );
	var colour2=new THREE.Color( 0x0000ff );

	var texture = new THREE.TextureLoader().load( './textures/ball.png');


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
	const mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), material);

  var linearVelocity = new THREE.Vector3(0,0,0);
	var linearInitVelocity = new THREE.Vector3(0,0,0);
	var angle=60;

	var mass=0.01;
	var initTime=0;
	var prevTime=0;
	var collideTime=0;
	var linearAcceleration = new THREE.Vector3(0,0,0);

	var force=0.1;

	var owner="1";
	var bounces=0;

	mesh.position.set(0, 0, -20);
	scene.add(mesh);

	this.update = function(time) {

		linearVelocity.y=linearInitVelocity.y+linearAcceleration.y*(time-prevTime);
		linearVelocity.x=linearInitVelocity.x+linearAcceleration.x*(time-prevTime);

		mesh.position.y += linearVelocity.y;
		mesh.position.x += linearVelocity.x;

		linearInitVelocity=linearVelocity;
		prevTime=time;
	}


  function isBallIntersectingObject(object){

		var ball_Ymax=mesh.position.y+radius;
		var ball_Ymin=mesh.position.y-radius;
		var ball_Xmax=mesh.position.x+radius;
		var ball_Xmin=mesh.position.x-radius;

		var object_Ymax=object.position.y+(object.geometry.parameters.height)/2;//+object.geometry.parameters.depth;
		var object_Ymin=object.position.y-(object.geometry.parameters.height)/2;//+object.geometry.parameters.depth;
		var object_Xmax=object.position.x+(object.geometry.parameters.width)/2;//+object.geometry.parameters.depth;
		var object_Xmin=object.position.x-(object.geometry.parameters.width)/2;//+object.geometry.parameters.depth;

    if( ball_Xmin<=object_Xmax && ball_Xmin>=object_Xmin){
      if(ball_Ymin<=object_Ymax && ball_Ymin>=object_Ymin){
        return true;
      }else if(ball_Ymax>=object_Ymin && ball_Ymax<=object_Ymax){
        return true;
      }
    }else if(ball_Xmax>=object_Xmin && ball_Xmin<=object_Xmax){
			if(ball_Ymin<=object_Ymax && ball_Ymin>=object_Ymin){
        return true;
      }else if(ball_Ymax>=object_Ymin && ball_Ymax<=object_Ymax){
        return true;
      }
		}
    return false;
  }

  function collide(type,brickNumber) {
		audioController.playBounceAudio();
		linearVelocity.y=linearInitVelocity.y+linearAcceleration.y*(collideTime-initTime);
		linearVelocity.x=linearInitVelocity.x+linearAcceleration.x*(collideTime-initTime);
		initTime=collideTime;

      linearVelocity.y+=linearVelocity.y*acceleration;
      linearVelocity.x+=linearVelocity.x*acceleration;

		if (type=="wall left"||type=="wall right") {
			linearVelocity.y*=1;
			linearVelocity.x*=-1;
		}else{
			linearVelocity.y*=-1;
			linearVelocity.x*=1;
			if (type=="brick") {
				console.log("Ball brick "+owner+" "+brickNumber+" "+bounces);
				eventBus.post("damaged",[owner,brickNumber,bounces]);
			}
		}

		if (type=="handle1") {
			if (owner=="1") {
				console.log(type+" "+owner);
				if (playerMode!="1 Player") {
					owner=2;
					mesh.material.uniforms.color.value=colour2;
				}
				bounces=-1;
			}
		}else if(type=="handle2"){
			if (owner=="2") {
				console.log(type+" "+owner);
				owner=1;
				bounces=-1;
				mesh.material.uniforms.color.value=colour1;
			}
		}
		bounces++;
  }

	/* Event Bus - Start */
	eventBus.subscribe("collisionDetect",function(args){
		var object=args[0];
		var type=args[1];
		var brickNumber=args[3];
		if ( isBallIntersectingObject(object) ){
			collideTime=args[2];
			collide(type,brickNumber);
		}
	});

	eventBus.subscribe("startBall",function(object){
		linearVelocity.y=force*THREE.Math.randInt(-1,1)*Math.sin(angle);
		linearVelocity.x=force*THREE.Math.randInt(-1,1)*Math.cos(angle);
		linearAcceleration = new THREE.Vector3(0,0,0);
	});

	eventBus.subscribe("stopBall",function(object){
		linearVelocity.y=0;
		linearVelocity.x=0;
		linearAcceleration = new THREE.Vector3(0,0,0);
	});

	eventBus.subscribe("isBallLost",function(y){
		if(y>=mesh.position.y){
			audioController.playBallLostAudio();
			eventBus.post("ballLost",owner);
		}
	});

	eventBus.subscribe("ballReset",function(object){
		mesh.position.y=0;
		mesh.position.x=0;
		linearVelocity.y=0;
		linearVelocity.x=0;
	});

	eventBus.subscribe("changeBallColour",function(args) {
		var owner=args[0];
		var colour=new THREE.Color( args[1] );
    if (owner=="1") {
      colour1=colour;
    }else{
			colour2=colour;
		}
		mesh.material.uniforms.color.value=colour1;
  });
	/* Event Bus - End */
}
