function Ball(scene,eventBus) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	const mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xffff00} ));

  var linearVelocity = new THREE.Vector3(0,0,0);
	var angle=60;
	var force=0.1;

	mesh.position.set(0, 0, -20);
	scene.add(mesh);



  eventBus.subscribe("collisionDetect",function(args){
    if ( isBallIntersectingObject(args[0]) ){
			console.log(args[1]);
      collide(args);
    }
  });

  eventBus.subscribe("startGame",function(object){
		console.log(Math);
    linearVelocity.y=force*THREE.Math.randInt(-1,1)*Math.sin(angle);
		linearVelocity.x=force*THREE.Math.randInt(-1,1)*Math.cos(angle);
  });

  eventBus.subscribe("isBallLost",function(handle){
    if(handle.position.y>=mesh.position.y){
      eventBus.post("ballLost");
    }
  });

  eventBus.subscribe("ballReset",function(object){
    mesh.position.y=0;
		mesh.position.x=0;
    linearVelocity.y=0;
		linearVelocity.x=0;
  });

	this.update = function(time) {
    mesh.position.y += linearVelocity.y;
		mesh.position.x += linearVelocity.x;
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

  function collide(args) {
		var type=args[1];
		if (type=="wall left"||type=="wall right") {
			linearVelocity.y*=1;
			linearVelocity.x*=-1;
		}else{
			linearVelocity.y*=-1;
			linearVelocity.x*=1;
			if (type=="brick") {
				eventBus.post("damaged",args[2]);
			}
		}
  }
}
