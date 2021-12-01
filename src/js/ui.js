class UI{
  // constructor for the UI class
  constructor(){
    this.renderer = new Renderer();
    this.moving = false;
  }
  /**
   * set the list of objects that will be used in the scene to objects passed in
   * the light is the first object. send objects to Renderer
   * @param {Array} objects Array ob objects in the scene
   */
  setObjects(objects){
    this.objects = objects;
    this.objects.splice(0, 0, new Light());
    this.renderer.setObjects(this.objects);
  }

  getObjects(){
    this.renderer.getObjects();
  }

  update(time){
    this.modelview = makeLookAt(eye.elements[0], eye.elements[1], eye.elements[2], eye.elements[0] + at.elements[0], eye.elements[1] + at.elements[1], eye.elements[2]+ at.elements[2], 0, 1, 0);
    this.projection = makePerspective(90, 1280/720, 0.1, 100);
    this.modelviewProjection = this.projection.multiply(this.modelview);
    this.renderer.update(this.modelviewProjection, time);
  }

  mouseDown(x,y){
    var t;
    var origin = eye;
    var ray = getEyeRay(this.modelviewProjection.inverse(), 0, 0);

    // test the selection box first
    if(this.renderer.selectedObject != null) {
      var minBounds = this.renderer.selectedObject.getMinCorner();
      var maxBounds = this.renderer.selectedObject.getMaxCorner();
      t = getintersect(origin, ray, minBounds, maxBounds);

      if(t < Number.MAX_VALUE) {
        var hit = origin.add(ray.multiply(t));



        //normal based translation stuff
        if(Math.abs(hit.elements[0] - minBounds.elements[0]) < 0.001) this.movementNormal = Vector.create([-1, 0, 0]);
        else if(Math.abs(hit.elements[0] - maxBounds.elements[0]) < 0.001) this.movementNormal = Vector.create([+1, 0, 0]);
        else if(Math.abs(hit.elements[1] - minBounds.elements[1]) < 0.001) this.movementNormal = Vector.create([0, -1, 0]);
        else if(Math.abs(hit.elements[1] - maxBounds.elements[1]) < 0.001) this.movementNormal = Vector.create([0, +1, 0]);
        else if(Math.abs(hit.elements[2] - minBounds.elements[2]) < 0.001) this.movementNormal = Vector.create([0, 0, -1]);
        else this.movementNormal = Vector.create([0, 0, +1]);

        this.movementDistance = this.movementNormal.dot(hit);
        this.movementDistance = 0.1;
        this.originalHit = hit;
        this.moving = true;

        return true;
      }
    }

    t = Number.MAX_VALUE;
    this.renderer.selectedObject = null;

    for(var i = 0; i < this.objects.length; i++) {
      var objectT = this.objects[i].intersect(origin, ray);
      if(objectT < t) {
        t = objectT;
        this.renderer.selectedObject = this.objects[i];
      }
    }

    return (t < Number.MAX_VALUE);
  }

  mouseMove(x,y){
    if(this.moving) {
      var origin = eye;
      var ray = getEyeRay(this.modelviewProjection.inverse(), (x /1280) * 2 - 1, 1 - (y / 720) * 2);

      var t = (this.movementDistance - this.movementNormal.dot(origin)) / this.movementNormal.dot(ray);
      var hit = origin.add(ray.multiply(t));
      this.renderer.selectedObject.temporaryTranslate(hit.subtract(this.originalHit)); //use for normal based translation

      // clear the sample buffer
      this.renderer.pathTracer.sampleCount = 0;
    }
  }

  mouseUp(x,y){
    if(this.moving) {
      var origin = eye;
      var ray = getEyeRay(this.modelviewProjection.inverse(), (x / 1280) * 2 - 1, 1 - (y / 720) * 2);

      var t = (this.movementDistance - this.movementNormal.dot(origin)) / this.movementNormal.dot(ray);
      var hit = origin.add(ray.multiply(t));
      this.renderer.selectedObject.temporaryTranslate(Vector.create([0, 0, 0]));
      this.renderer.selectedObject.translate(hit.subtract(this.originalHit)); //use for normal based transltating

      this.moving = false;
    }
  }

  render(){
    this.renderer.render();
  }

  selectLight(){
    this.renderer.selectedObject = this.objects[0];
  }

  addCube(){
    this.objects.push(new Cube(Vector.create([-0.25, -0.25, -0.25]), Vector.create([0.25, 0.25, 0.25]), nextObjectId++));
    this.renderer.setObjects(this.objects);
  }

  deleteSelection(){
    for(var i = 0; i < this.objects.length; i++) {
      if(this.renderer.selectedObject == this.objects[i]) {
        this.objects.splice(i, 1);
        this.renderer.selectedObject = null;
        this.renderer.setObjects(this.objects);
        break;
      }
    }
  }

  updateEnvironment(){
    var newEnvironment = parseInt(document.getElementById('environment').value, 10);
    if(environment != newEnvironment) {
      environment = newEnvironment;
      this.renderer.setObjects(this.objects);
    }
  }
}
