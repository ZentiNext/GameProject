function Brick(scene,eventBus,brick) {
	const width = 2;
	const height = 0.4;
	const depth = 0.1;
console.log(brick);
	var texture = new THREE.TextureLoader().load( './images/cactusSlab.png');
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ),material);

	mesh.position.set(-6+(brick*3)%13,1+(brick*3)%5,0);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("collisionDetect",[mesh,"brick",time,brick]);
	}

	/* Event Bus - Start */


	eventBus.subscribe("removeAllBricks",function(){
		console.log("remove bricks ");
		scene.remove(mesh);
	});

	eventBus.subscribe("removeBrick",function(brickNumber){
		if (brickNumber==brick) {
			scene.remove(mesh);
		}
	});
	/* Event Bus - End */
}

function Bricks(scene,eventBus) {

	const mesh = new THREE.Mesh();

	mesh.position.set(0, 0, -20);

	scene.add(mesh);

	var bricksSubjects=[];

	this.update = function(time) {
		for(let i=0; i<bricksSubjects.length; i++){
			if(bricksSubjects[i]){
				bricksSubjects[i].update(time);
			}
		}
	}

	/* Event Bus - Start */
	eventBus.subscribe("bricks",function(bricks){
		console.log("Brick bricks i "+bricks);
		for (var i = 0; i < bricks; i++) {
			bricksSubjects[i]=new Brick(mesh,eventBus,i);
		}
	});

	eventBus.subscribe("removeBrick",function(brick){
		delete bricksSubjects[brick];
	});

	eventBus.subscribe("damaged",function(args){
		//console.log("damaged "+brick+" "+args);
		var owner=args[0];
		var brickNumber=args[1];
		var bounces=args[2];

			console.log("Brick brickNumber "+brickNumber);
			eventBus.post("removeBrick",brickNumber);
			delete bricksSubjects[brickNumber];
			eventBus.post("brickDamaged",[owner,bounces]);

	});
	/* Event Bus - End */
}
