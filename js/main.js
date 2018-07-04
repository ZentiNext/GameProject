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
