function PlayerController(eventBus){

  const keyboard	= new THREEx.KeyboardState();

  const moveSpeed = 0.1;

  var lives = 3;

  this.getLives = function(){
    return lives;
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
