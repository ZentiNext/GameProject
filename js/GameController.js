function GameController(eventBus,clock) {
  var player1 = new PlayerController(eventBus,clock,"player1");
  var player2 = new PlayerController(eventBus,clock,"player2");

  const keyboard	= new THREEx.KeyboardState();

  var lives = 3;
  var bricks = 2;
  var damagedBricks= 0;
  var moveSpeed = 0.1;


  eventBus.subscribe("gameControls",function(args){
    lives=args[0];
    bricks=args[1];
    moveSpeed=args[2];
    eventBus.post("removeAllLives");
    eventBus.post("lives",lives);
    eventBus.post("removeAllBricks");
    eventBus.post("bricks",bricks);
  });

  this.startGame = function(){
    if( keyboard.pressed('enter') ){
      eventBus.post("startBall");
    }
  }

  this.createGame = function() {
    eventBus.subscribe("keyboard1",player1.keyPressed);
    eventBus.post("lives",lives);
    eventBus.post("bricks",bricks);
    createPlayer1();
    createPlayer2();
  }

  function createPlayer2() {
    eventBus.subscribe("keyboard2",player2.keyPressed);
    eventBus.post("lives",lives);
    eventBus.post("bricks",bricks);
  }

  function createPlayer1() {
    eventBus.subscribe("keyboard1",player1.keyPressed);
    eventBus.post("lives",player1.getLives());
    eventBus.post("bricks",player1.getBricks());
  }

  eventBus.subscribe("brickDamaged",function(player) {
    //console.log("damagedBricks "+damagedBricks);
    //console.log("bricks "+bricks);
    damagedBricks++;
    if(player=="player1"){
      player1.brickDamaged();
    }else{
      player2.brickDamaged();
    }
    if (damagedBricks==bricks) {
      if (player1.score>player2.score) {
        eventBus.post("win",["player 1",player1.score]);
      }else if(player1.score<player2.score) {
        eventBus.post("win",["player 2",player2.score]);
      }else{
        eventBus.post("win",["Both Scored Same",player1.score]);
      }

      eventBus.post("ballReset");
    }
  });

  eventBus.subscribe("gameReset",function() {
    damagedBricks=0;
    eventBus.post("removeAllLives");
    eventBus.post("removeAllBricks");
    eventBus.post("lives",lives);
    eventBus.post("bricks",bricks);
    eventBus.post("playerReset");
  });
}
