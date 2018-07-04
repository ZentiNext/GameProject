function PlayerController(eventBus,clock){

  const keyboard	= new THREEx.KeyboardState();

  const moveSpeed = 0.1;

  var lives = 4;

  var bricks = 2;

  var score = 1;

  var timeBonus = 1000*bricks;

  this.getLives = function(){
    return lives;
  }
  this.getBricks = function(){
    return bricks;
  }

  this.keyPressed = function(player){
		if( keyboard.pressed('left') ){
			moveLeft(player);
		}else if( keyboard.pressed('right') ){
			moveRight(player);
		}else if( keyboard.pressed('enter') ){
			eventBus.post("startGame");
		}
	}


  eventBus.subscribe("ballLost",function(){
    lives--;
    if (lives==0) {
      eventBus.post("lost");
    }
    eventBus.post("removeLife",lives);
    eventBus.post("ballReset");
  });

  eventBus.subscribe("brickDamaged",function(){
    bricks--;
    score+=Math.floor(timeBonus-clock.getElapsedTime())+lives;
    eventBus.post("scoreChange",score);
    if (bricks==0) {
      eventBus.post("win",score);
      eventBus.post("ballReset");
    }

  })

  this.startGame = function(){
    if( keyboard.pressed('enter') ){
			eventBus.post("startGame");
		}
  }

  function moveLeft(player) {
    player.position.x -= moveSpeed;
  }

  function moveRight(player) {
    player.position.x += moveSpeed;
  }

  function moveUp(player) {
    player.position.y += moveSpeed;
  }

  function moveDown(player) {
    player.position.y -= moveSpeed;
  }

}
