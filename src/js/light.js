class Light{
  constructor(){
    this.temporaryTranslation = Vector.create([0, 0, 0]);
  }


   temporaryTranslate(translation){
    var tempLight = light.add(translation);
    this.temporaryTranslation = tempLight.subtract(light);
  }

   translate(translation){
    light = light.add(translation);
  }

   getMinCorner(){
    return light.add(this.temporaryTranslation).subtract(Vector.create([lightSize, lightSize, lightSize]));
  }

   getMaxCorner(){
    return light.add(this.temporaryTranslation).add(Vector.create([lightSize, lightSize, lightSize]));
  }

  getGlobalCode(){
    return 'uniform vec3 light;';
  }

  getIntersectCode(){
    return '';
  }

  getShadowTestCode() {
    return '';
  }

  getMinimumIntersectCode() {
    return '';
  }

  getNormalCalculationCode() {
    return '';
  }

  setUniforms(renderer) {
    renderer.uniforms.light = light.add(this.temporaryTranslation);
  }

  intersect(origin, ray) {
    return Number.MAX_VALUE;
  }
}
