function Ball(scene,eventBus) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	const mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xffff00} ));

  var linearVelocity = new THREE.Vector3(0,0,0);
	var linearInitVelocity = new THREE.Vector3(0,0,0);
	var angle=60;

	var mass=0.01;
	var initTime=0;
	var prevTime=0;
	var collideTime=0;
	var linearAcceleration = new THREE.Vector3(0,0,0);

	var force=0.1;

	var owner="player1";

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
				console.log("1 1");
        return true;
      }else if(ball_Ymax>=object_Ymin && ball_Ymax<=object_Ymax){
				console.log("1 2");
				console.log(ball_Ymax);
				console.log(object_Ymin);
        return true;
      }
    }else if(ball_Xmax>=object_Xmin && ball_Xmin<=object_Xmax){
			if(ball_Ymin<=object_Ymax && ball_Ymin>=object_Ymin){
				console.log("2 1");
        return true;
      }else if(ball_Ymax>=object_Ymin && ball_Ymax<=object_Ymax){
				console.log("2 2");
        return true;
      }
		}
    return false;
  }

  function collide(type,brickNumber) {
		console.log("collide");
		linearVelocity.y=linearInitVelocity.y+linearAcceleration.y*(collideTime-initTime);
		linearVelocity.x=linearInitVelocity.x+linearAcceleration.x*(collideTime-initTime);
		initTime=collideTime;

		if (type=="wall left"||type=="wall right") {
			linearVelocity.y*=1;
			linearVelocity.x*=-1;
		}else{
			linearVelocity.y*=-1;
			linearVelocity.x*=1;
			if (type=="brick") {
				console.log("collide brick");
				eventBus.post("damaged",[owner,brickNumber]);
			}
		}

  }

	/* Event Bus - Start */
	eventBus.subscribe("collisionDetect",function(args){
		var object=args[0];
		var type=args[1];
		var brickNumber=args[3];
		if ( isBallIntersectingObject(object) ){
			collideTime=args[2];
			console.log(type);
			collide(type,brickNumber);
		}
	});

	eventBus.subscribe("startBall",function(object){
		linearVelocity.y=force*THREE.Math.randInt(-1,1)*Math.sin(angle);
		linearVelocity.x=force*THREE.Math.randInt(-1,1)*Math.cos(angle);
		linearAcceleration = new THREE.Vector3(0.01,0.01,0);
	});

	eventBus.subscribe("stopBall",function(object){
		linearVelocity.y=0;
		linearVelocity.x=0;
		linearAcceleration = new THREE.Vector3(0,0,0);
	});

	eventBus.subscribe("isBallLost",function(y){
		if(y>=mesh.position.y){
			eventBus.post("ballLost");
		}
	});

	eventBus.subscribe("ballReset",function(object){
		mesh.position.y=0;
		mesh.position.x=0;
		linearVelocity.y=0;
		linearVelocity.x=0;
	});
	/* Event Bus - End */
}
