class Cube{
  constructor(minCorner, maxCorner, cubeID){
    this.minCorner = minCorner;
    this.maxCorner = maxCorner;
    this.cubeID = cubeID;
    this.minStr = 'cubeMin' + cubeID;
    this.maxStr = 'cubeMax' + cubeID;
    this.intersectStr = 'tCube' + cubeID;
    this.temporaryTranslation = Vector.create([0, 0, 0]);
  }

   translate(translation){
    this.minCorner = this.minCorner.add(translation);
    this.maxCorner = this.maxCorner.add(translation);
  }

   getMinCorner(){
    return this.minCorner.add(this.temporaryTranslation);
  }

   getMaxCorner(){
    return this.maxCorner.add(this.temporaryTranslation);
  }

  getGlobalCode(){
    return '' +
  ' uniform vec3 ' + this.minStr + ';' +
  ' uniform vec3 ' + this.maxStr + ';';
  }

  getIntersectCode(){
    return '' +
  ' vec2 ' + this.intersectStr + ' = intersectCube(origin, ray, ' + this.minStr + ', ' + this.maxStr + ');';
  }

  getShadowTestCode(){
    return '' +
    this.getIntersectCode() +
  ' if(' + this.intersectStr + '.x > 0.0 && ' + this.intersectStr + '.x < 1.0 && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y) return 0.0;';
  }

  setUniforms(renderer){
    renderer.uniforms[this.minStr] = this.getMinCorner();
    renderer.uniforms[this.maxStr] = this.getMaxCorner();
  }

  getNormalCalculationCode(){
    return '' +
    // have to compare intersectStr.x < intersectStr.y otherwise two coplanar
    // cubes will look wrong (one cube will "steal" the hit from the other)
  ' else if(t == ' + this.intersectStr + '.x && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y) normal = normalForCube(hit, ' + this.minStr + ', ' + this.maxStr + ');';
  }

  getMinimumIntersectCode(){
    return '' +
  ' if(' + this.intersectStr + '.x > 0.0 && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y && ' + this.intersectStr + '.x < t) t = ' + this.intersectStr + '.x;';
  }

  intersect(origin, ray) {
    return getintersect(origin, ray, this.getMinCorner(), this.getMaxCorner());
  }

  temporaryTranslate(translation) {
    this.temporaryTranslation = translation;
  }

}
