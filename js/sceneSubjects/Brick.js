function Brick(scene,eventBus,brick) {
	console.log(brick);
	const width = 2;
	const height = 0.4;
	const depth = 0.1;
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ), new THREE.MeshBasicMaterial( { color: 0x0000ff } ));

	mesh.position.set(-6+(brick*3)%13,1+(brick*3)%5,0);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("collisionDetect",[mesh,"brick",time,brick]);
	}

	/* Event Bus - Start */
	eventBus.subscribe("damaged",function(args){

		player=args[0];
		damagedBrick=args[1];

		console.log("player "+player);
		console.log("brick "+brick);
		console.log("damagedBrick "+damagedBrick);

		if(brick==damagedBrick){
			console.log("damaged");
			scene.remove(mesh);
			eventBus.post("removeBrick",brick);
			eventBus.post("brickDamaged",player);
		}
	});

	eventBus.subscribe("removeAllBricks",function(brick){
		scene.remove(mesh);
	});
	/* Event Bus - End */
}

function Bricks(scene,eventBus) {

	const mesh = new THREE.Mesh();

	mesh.position.set(0, 0, -20);

	scene.add(mesh);

	var bricks=[];

	this.update = function(time) {
		for(let i=0; i<bricks.length; i++){
			if(bricks[i]){
				bricks[i].update(time);
			}
		}
	}

	/* Event Bus - Start */
	eventBus.subscribe("bricks",function(lives){
		for (var i = 0; i < lives; i++) {
			bricks[i]=new Brick(mesh,eventBus,i);
		}
	});

	eventBus.subscribe("removeBrick",function(brick){
		delete bricks[brick];
	});
	/* Event Bus - End */
}
