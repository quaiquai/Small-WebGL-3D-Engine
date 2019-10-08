class ParticleStream{
  constructor(x, y, l, count){
    this.particleCount = count;
    this.particleList = [];
    this.particleStreamVerts = [];
    for (let i = 0; i < count; i++){
      this.particleList.push(new Particle(x, y, Math.random() * 2, Math.random() * 360, Math.random() * 10,
                                          [Math.random(), Math.random(), Math.random(), 1.0]));
      this.particleStreamVerts.push(x, y);
    }
  }

  streamUpdate(delta){

  }
}
