const canvas = document.getElementById("canvas");

const eventBus = new EventBus();

const sceneManager = new SceneManager(canvas,eventBus);

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

eventBus.subscribe("lost",function(){
	$("#messageModalHeader").text("You Lost!!");
	$("#messageModal").modal();
});

eventBus.subscribe("win",function(score){
	$("#messageModalHeader").text("You Win !! with "+score+" score");
	$("#messageModal").modal();
});

eventBus.subscribe("scoreChange",function(score){
	$("#score").text("Score: "+score);
});

$("#btnKeyboardControlsSubmit").click(function(){
	$("#status1").removeClass("alert-danger");
	$("#status1").removeClass("alert-success");
	var left=document.getElementById('left').value;
	var right=document.getElementById('right').value;
	var validate=new RegExp('^[a-zA-Z0-9]$');
	if(validate.test(left) && validate.test(right)){
		eventBus.post("keyboardControls",[left,right]);
		$("#status1").text("Successfully Changed");
		$("#status1").addClass("alert-success");
	}else{
		$("#status1").text("Wrong input");
		$("#status1").addClass("alert-danger");
	}
});
$("#btnGamePropertiesSubmit").click(function(){
	$("#status2").removeClass("alert-danger");
	$("#status2").removeClass("alert-success");
	var lives=document.getElementById('lives').value;
	var bricks=document.getElementById('bricks').value;
	var speedHandle=document.getElementById('speedHandle').value;
	var validate=new RegExp("^[1-9][0-9]*$");
	var validateDecimal=new RegExp("[1-9]([0-9]*\.[0-9]+)?$");
	if(validate.test(lives) && lives<=10 && validate.test(bricks) && bricks<=10 && validateDecimal.test(speedHandle) && speedHandle<=2){
		eventBus.post("gameControls",[lives,bricks,speedHandle]);
		$("#status2").text("Successfully Changed");
		$("#status2").addClass("alert-success");
	}else{
		$("#status2").text("Wrong input");
		$("#status2").addClass("alert-danger");
	}
});
