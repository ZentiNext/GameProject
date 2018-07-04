function PlayerController(){
  
  const keyboard	= new THREEx.KeyboardState();

  const moveSpeed = 0.1;

  this.keyPressed = function(player){
		if( keyboard.pressed('left') ){
			moveLeft(player);
		}else if( keyboard.pressed('right') ){
			moveRight(player);
		}else if( keyboard.pressed('down') ){
			moveDown(player);
		}else if( keyboard.pressed('up') ){
			moveUp(player);
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
