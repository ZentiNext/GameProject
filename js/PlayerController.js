function PlayerController(eventBus,clock,player){

  const keyboard	= new THREEx.KeyboardState();

  var moveSpeed = 0.1;

  var lives = 3;

  var bricks = 0;

  var score = 1;

  var timeBonus = 1000;

  var leftKey="left";
  var rightKey="right";

  if(player=="player2"){
    leftKey="a";
    rightKey="d";
  }

  var limit_Xmin=-10+1.1;
  var limit_Xmax=10-1.1;

  this.getLives = function(){
    return lives;
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

  this.brickDamaged = function(){
    bricks++;
    score+=Math.floor(timeBonus-clock.getElapsedTime())+lives;
    eventBus.post("scoreChange",score);
    console.log(player);
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
    leftKey=args[0];
    rightKey=args[1];
  });

  eventBus.subscribe("ballLost",function(){
    lives--;
    if (lives==0) {
      eventBus.post("lost");
    }
    eventBus.post("removeLife",lives);
    eventBus.post("ballReset");
  });

  eventBus.subscribe("playerReset",function(args){
    score=0;
  });
  	/* Event Bus - End */


}
