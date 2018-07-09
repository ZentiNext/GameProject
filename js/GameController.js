function GameController(eventBus,clock) {
  var player1 = new PlayerController(eventBus,clock,"1");
  var player2 = new PlayerController(eventBus,clock,"2");

  const keyboard	= new THREEx.KeyboardState();

  var lives = 3;
  var bricks = 3;
  var damagedBricks= 0;
  var moveSpeed = 0.1;

console.log("controllers "+bricks);


  this.startGame = function(){
    if( keyboard.pressed('enter') ){
      eventBus.post("startBall");
    }
  }

  this.createGame = function() {
    this.gameReset();
    createPlayer1();
    createPlayer2();
  }

  this.gameReset = function() {
    damagedBricks=0;
    eventBus.post("removeAllLives");
    eventBus.post("removeAllBricks");
    eventBus.post("lives",lives);
    eventBus.post("bricks",bricks);
    eventBus.post("playerReset");
    $("#score1").text("Score: 0");
    $("#score2").text("Score: 0");
  }

  function createPlayer2() {
    eventBus.subscribe("keyboard2",player2.keyPressed);
  }

  function createPlayer1() {
    eventBus.subscribe("keyboard1",player1.keyPressed);
  }

  eventBus.subscribe("brickDamaged",function(args) {
    var owner=args[0];
    var bounces = args[1];
    console.log("player "+owner+" bounces "+bounces+" damagedBricks "+damagedBricks);
    damagedBricks++;
    if(owner=="1"){
      player1.brickDamaged(bounces);
    }else{
      player2.brickDamaged(bounces);
    }
    if (damagedBricks==bricks) {
      console.log(damagedBricks);
      if (player1.getScore()>player2.getScore()) {
        eventBus.post("win",["1",player1.getScore()]);
      }else if(player1.getScore()<player2.getScore()) {
        eventBus.post("win",["2",player2.getScore()]);
      }else if(player1.getScore()==player2.getScore()){
        eventBus.post("win",["Both Scored Same",player1.getScore()]);
      }

      eventBus.post("ballReset");
    }
  });

  eventBus.subscribe("ballLost",function(player){
    if (player=="1") {
      player1.lifeLost(lives);
    } else {
      player2.lifeLost(lives);
    }

    eventBus.post("ballReset");
  });

  eventBus.subscribe("gameReset",this.gameReset);

  eventBus.subscribe("gameControls",function(args){
    lives=args[0];
    bricks=args[1];
    moveSpeed=args[2];
    damagedBricks=0;
    eventBus.post("removeAllLives");
    eventBus.post("removeAllBricks");
    eventBus.post("lives",lives);
    eventBus.post("bricks",bricks);
    eventBus.post("playerReset");
    $("#score1").text("Score: 0");
    $("#score2").text("Score: 0");
  });
}
