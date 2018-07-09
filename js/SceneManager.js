function SceneManager(canvas,eventBus) {

    const clock = new THREE.Clock();

    const gameController = new GameController(eventBus,clock);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        const scene = new THREE.Scene();
        var texture = new THREE.TextureLoader().load( "./textures/terrane.jpg" );
        scene.background = texture;

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 40;
        const nearPlane = 1;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new GeneralLights(scene),
            new Handle(scene,eventBus,"1"),
            //new Handle(scene,eventBus,"2"),
            new Ball(scene,eventBus),
            new Bricks(scene,eventBus),
            new LifePanel(scene,eventBus,"1"),
            //new LifePanel(scene,eventBus,"2"),
            new Wall(scene,eventBus)
        ];
        gameController.createGame();
        return sceneSubjects;
    }

    this.createTwoPlayerSceneSubjects = function() {
        sceneSubjects.push(new Handle(scene,eventBus,"2"));
        sceneSubjects.push(new LifePanel(scene,eventBus,"2"));
        gameController.createGame();
    }

    this.removeTwoPlayerSceneSubjects = function() {
        eventBus.post("removeHandle",2);
        eventBus.post("removeLifePanel",2);
    }


    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++){
          sceneSubjects[i].update(elapsedTime);
        }


        renderer.render(scene, camera);
        gameController.startGame();
    }

    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
    this.getCamera = function(){
      return camera;
    }
}
