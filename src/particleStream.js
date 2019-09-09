class ParticleStream{
  constructor(pos, sz, age, particleCount){
    this.particleCount = particleCount
    this.position = pos;
    this.size = sz;
    this.age = age;
    this.particles = [];
    this.allParticles = [];
    this.addParticles()
  }

  addParticles(){
    for(let i = 0; i < this.particleCount; i++){
      this.particles.push(new Particle([this.position[0], this.position[1]]))
      this.allParticles.push((Math.random() * 2) - 1, this.position[1])
    }
  }
}
