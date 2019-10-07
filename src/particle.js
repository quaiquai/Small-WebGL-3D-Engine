class Particle{
  // Nothing too exciting going on here, but it’s worth pointing out that the constructor takes an angle
  // (in degrees) and a speed (in pixels per second) and converts these values into a velocity vector.
  // This is intentional, when setting a particle up it’s easier to work with an angle and a speed.
  // But when updating the particle each frame, it’s easier to work with a velocity vector.
  constructor(x, y, l, angle, speed, color){
    this.position = {
      x: x,
      y: y
    };
    var angleInRad = angle * Math.PI/180;
    this.velocity = {
      x: (speed * Math.cos(angleInRad)),
      y: -(speed * Math.sin(angleInRad))
    }
    this.lifeTime = l;
    this.color = color;
  }

  update(dt){
    this.lifeTime -= dt;

    if(this.lifeTime > 0){
      this.position.x += this.velocity.x * dt * 0.03;
      this.position.y += this.velocity.y * dt * 0.03;
      this.color[3] = this.lifeTime;
    }

    if(this.lifeTime <= 0){
      this.position.x = 0;
      this.position.y = 0;
      this.color[3] = 1.0;
      this.lifeTime = 2.0;
    }
  }
}
