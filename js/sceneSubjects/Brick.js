function Brick(scene,eventBus,brick) {
	const width = 2;
	const height = 0.4;
	const depth = 0.1;

	var texture = new THREE.TextureLoader().load( './images/cactusSlab.png');
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	const mesh = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ),material);

	mesh.position.set(-6+(brick*3)%13,1+(brick*3)%5,0);
	scene.add(mesh);

	this.update = function(time) {
		eventBus.post("collisionDetect",[mesh,"brick",time,brick]);
	}

	/* Event Bus - Start */
	eventBus.subscribe("damaged",function(args){

		var owner=args[0];
		var damagedBrick=args[1];
		var bounces=args[2];

		if(brick==damagedBrick){
			scene.remove(mesh);
			eventBus.post("removeBrick",brick);
			eventBus.post("brickDamaged",[owner,bounces]);
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
