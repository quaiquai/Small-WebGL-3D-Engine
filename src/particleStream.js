class ParticleStream{
  constructor(x, y, l, angle, speed, count){
    this.particleCount = count;
    this.particleList = [];
    this.particleStreamVerts = [];
    for (let i = 0; i < count; i++){
      this.particleList.push(new Particle(x, y, l, angle, speed));
      this.particleStreamVerts.push(x, y);
    }
  }
}
