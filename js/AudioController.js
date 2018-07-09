function AudioController(){
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  sceneManager.getCamera().add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();


  this.stopAudio = function(){
    sound.stop();
  }

  this.playMenuAudio = function(){
    audioLoader.load( './sounds/Game-Menu_Looping.mp3', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });
  }

  this.playBounceAudio = function(){
    var bounceSound = new THREE.Audio( listener );
    var bounceAudioLoader = new THREE.AudioLoader();
    bounceAudioLoader.load( './sounds/Bounce-Sound.mp3', function( buffer ) {
      bounceSound.setBuffer( buffer );
      bounceSound.setLoop(false);
      bounceSound.setVolume(0.9);
      bounceSound.play();
    });
  }

  this.playBallLostAudio = function(){
    var bounceSound = new THREE.Audio( listener );
    var bounceAudioLoader = new THREE.AudioLoader();
    bounceAudioLoader.load( './sounds/Balloon-Popping.mp3', function( buffer ) {
      bounceSound.setBuffer( buffer );
      bounceSound.setLoop(false);
      bounceSound.setVolume(0.9);
      bounceSound.play();
    });
  }

}
