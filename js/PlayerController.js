function PlayerController(eventBus,clock,player){

  const keyboard	= new THREEx.KeyboardState();

  var moveSpeed = 0.1;

  var livesLost = 0;

  var bricks = 0;

  var score = 0;

  var colour=0xff0000;

  var leftKey="left";
  var rightKey="right";

  if(player=="2"){
    leftKey="a";
    rightKey="d";
    colour=0x0000ff;
  }

  var limit_Xmin=-10+1.1;
  var limit_Xmax=10-1.1;

  this.getLives = function(){
    return livesLost;
  }

  this.lifeLost = function(lives){
    livesLost++;
    if (lives==livesLost) {
      eventBus.post("lost",player);
    }
    eventBus.post("removeLife",[livesLost,player]);
  }

  this.getBricks = function(){
    return bricks;
  }

  this.getScore = function(){
    return score;
  }

  this.keyPressed = function(player){
		if( keyboard.pressed(leftKey) ){
			moveLeft(player);
		}else if( keyboard.pressed(rightKey) ){
			moveRight(player);
		}
	}

  this.brickDamaged = function(bounces){
    bricks++;
    console.log("player "+player+" "+score);
    console.log();
    score+=40-bounces-livesLost;

    eventBus.post("scoreChange",[score,player]);
  }

  function moveLeft(player) {
    if (limit_Xmin<player.position.x) {
      player.position.x -= moveSpeed;
    }
  }

  function moveRight(player) {
    if (limit_Xmax>player.position.x) {
      player.position.x += parseFloat(moveSpeed);
    }
  }

  function moveUp(player) {
    player.position.y += moveSpeed;
  }

  function moveDown(player) {
    player.position.y -= moveSpeed;
  }

	/* Event Bus - Start */
  eventBus.subscribe("keyboardControls",function(args){
    playerKey=args[2];
    colour=args[3];
    if (playerKey==player) {
      leftKey=args[0];
      rightKey=args[1];
      eventBus.post("changeBallColour",[player,colour]);
      eventBus.post("changeHandleColour",[player,colour]);
      eventBus.post("changeLifeColour",[player,colour]);
    }

  });


  eventBus.subscribe("playerReset",function(args){
    score=0;
    bricks=0;
    lives=0;
  });
  	/* Event Bus - End */


}
