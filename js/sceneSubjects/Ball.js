function Ball(scene,eventBus) {

	const radius = 0.2;
  const widthSegments = 8;
  const heightSegments = 8;
	const mesh = new THREE.Mesh(new THREE.SphereGeometry( radius, widthSegments, heightSegments ), new THREE.MeshBasicMaterial( {color: 0xffff00} ));

  var linearVelocity = new THREE.Vector3(0.1,-0.1,0);
  var angularVelocity = new THREE.Vector3(1,1,0);

	mesh.position.set(0, 3, -20);
	scene.add(mesh);

  eventBus.subscribe("handle",function(object){
    if (isBallIntersectingObject(object)){
      collide();
    }
  })

  eventBus.subscribe("brick",function(object){
    if (isBallIntersectingObject(object)){
      collide();
    }
  })

	this.update = function(time) {
      mesh.position.y += linearVelocity.y;

	}


  function isBallIntersectingObject(object){
    var object_YBoundry=(object.geometry.parameters.height)/2+object.geometry.parameters.depth;
    var object_XBoundry=(object.geometry.parameters.width)/2+object.geometry.parameters.depth;
    if( mesh.position.x-radius<=object.position.x+object_XBoundry && mesh.position.x+radius>=object.position.x-object_XBoundry){
      if(mesh.position.y-radius<=object.position.y+object_YBoundry && mesh.position.y-radius>=object.position.y-object_YBoundry){
        return true;
      }else if(mesh.position.y+radius>=object.position.y-object_YBoundry && mesh.position.y+radius<=object.position.y+object_YBoundry){
        return true;
      }
    }
    return false;
  }

  function collide() {
    linearVelocity.y*=-1;
  }
}
