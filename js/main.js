const canvas = document.getElementById("canvas");

const eventBus = new EventBus();

const sceneManager = new SceneManager(canvas,eventBus);

const audioController = new AudioController();

var playerMode="1 Player";

bindEventListeners();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';

	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}
$("#btnMode").click(function(){
	console.log("change mode");
	if (playerMode=="1 Player") {
		playerMode="2 Player";
		$("#btnMode").text("Two Player");
		$("#score2").html("Score: 0");
		sceneManager.createTwoPlayerSceneSubjects();
	} else {
		playerMode="1 Player";
		$("#btnMode").text("One Player");
		$("#score2").html("");
		sceneManager.removeTwoPlayerSceneSubjects();
	}

});
$("#btnKeyboardControls1Submit").click(function(){
	var specialkeys=["left","right","up","down"];
	$("#status1").removeClass("alert-danger");
	$("#status1").removeClass("alert-success");
	var left=document.getElementById('left1').value;
	var right=document.getElementById('right1').value;
	var colour=document.getElementById('colour1').value;
	var validate=new RegExp('^[a-zA-Z0-9]$');
	if((specialkeys.includes(left) || validate.test(left)) && (specialkeys.includes(right) || validate.test(right)) ){
		eventBus.post("keyboardControls",[left,right,"1",colour]);
		$("#status1").text("Successfully Changed");
		$("#status1").addClass("alert-success");
	}else{
		$("#status1").text("Wrong input");
		$("#status1").addClass("alert-danger");
	}
});
$("#btnKeyboardControls2Submit").click(function(){
	var specialkeys=["left","right","up","down"];
	$("#status1").removeClass("alert-danger");
	$("#status1").removeClass("alert-success");
	var left=document.getElementById('left2').value;
	var right=document.getElementById('right2').value;
	var colour=document.getElementById('colour2').value;
	var validate=new RegExp('^[a-zA-Z0-9]$');
	if((specialkeys.includes(left) || validate.test(left)) && (specialkeys.includes(right) || validate.test(right)) ){
		eventBus.post("keyboardControls",[left,right,"2",colour]);
		$("#status2").text("Successfully Changed");
		$("#status2").addClass("alert-success");
	}else{
		$("#status2").text("Wrong input");
		$("#status2").addClass("alert-danger");
	}
});

$("#btnGamePropertiesSubmit").click(function(){
	$("#status3").removeClass("alert-danger");
	$("#status3").removeClass("alert-success");
	var lives=document.getElementById('lives').value;
	var bricks=document.getElementById('bricks').value;
	var speedHandle=document.getElementById('speedHandle').value;
	var validate=new RegExp("^[1-9][0-9]*$");
	var validateDecimal=new RegExp("[1-9]([0-9]*\.[0-9]+)?$");

	if(validate.test(lives) && lives<=10 && validate.test(bricks) && bricks<=10 && validateDecimal.test(speedHandle) && speedHandle<=2){
		eventBus.post("gameControls",[lives,bricks,speedHandle]);
		$("#status3").text("Successfully Changed");
		$("#status3").addClass("alert-success");
	}else{
		$("#status3").text("Wrong input");
		$("#status3").addClass("alert-danger");
	}
});

$("#btnMenu").click(function(){
	audioController.playMenuAudio();
});

$("#btnMenuClose").click(function(){
	audioController.pauseMenuAudio();
});

$("#playAgain").click(function(){
	eventBus.post("gameReset");
	$("#messageModal").modal("hide");
});

/* Event Bus - Start */
eventBus.subscribe("lost",function(player){
	$("#messageModalHeader").text("Player "+player+" Lost!!");
	eventBus.post("stopBall");
	$("#messageModal").modal();
});

eventBus.subscribe("win",function(args){
	var player=args[0];
	var score=args[1];
	$("#messageModalHeader").text(player+" Win !! with "+score+" score");
	eventBus.post("stopBall");
	$("#messageModal").modal();
});

eventBus.subscribe("scoreChange",function(args){
	var score=args[0];
	var player = args[1];
	if (player=="1") {
			$("#score1").text("Score: "+score);
	}else{
		$("#score2").text("Score: "+score);
	}
});
/* Event Bus - End */
