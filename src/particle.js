class Particle{
  // Nothing too exciting going on here, but it’s worth pointing out that the constructor takes an angle
  // (in degrees) and a speed (in pixels per second) and converts these values into a velocity vector.
  // This is intentional, when setting a particle up it’s easier to work with an angle and a speed.
  // But when updating the particle each frame, it’s easier to work with a velocity vector.

  //Much help in physics calculations from: https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
  constructor(x, y, l, angle, speed, color){
    this.position = {
      x: x,
      y: y
    };
    var angleInRad = angle * Math.PI/180;
    this.angl = angleInRad;
    this.velocity = {
      x: (speed * Math.cos(angleInRad)),
      y: -(speed * Math.sin(angleInRad))
    }
    this.lifeTime = l;
    this.color = color;
    this.mass = 0.1;
    this.restitution = -0.7;
    this.s = speed;
  }

  update(dt){
    var Cd = 0.47; // Dimensionless ("coefficient of drag")
    var rho = 1.22; // kg / m^3 density of fluid ball is in (1.22) for air
    var A = Math.PI * 4 * 4 / (10000);
    var ag = 9.81;

    // Do physics
    // Drag force: Fd = -1/2 * Cd * A * rho * v *
    /*
    FD, x = -0.5 * CD * A * ρ * vx2
    FD, y = -0.5 * CD * A * ρ * vy2
    CD is the "coefficient of drag", which is influenced by the shape of the object (and a little bit by its material).
        For a ball, this is 0.47, and is a dimensionless quantity.
    A is the frontal area or frontal projection of the object. If you look at a silhouette of the object from the front,
        this is the area of that shape. For a ball, the frontal area is just the area of a circle, or π r2.
    ρ (Greek letter rho) is the density of the fluid the ball is in. If our ball's in air, this value is 1.22 (kg / m3)
    Velocity squared -- since we're looking at this in two directions separately, we use the X velocity and the Y
        velocity respectively.
    Note the -0.5 at the beginning. The negative sign, with the fact that the equation uses velocity,
        indicates that this force pushes in the opposite direction the ball is moving at all times. Because the velocity is squared it'll always be positive, which means the whole equation will always be negative, ie, opposite the velocity.
    */
    var Fx = -0.5 * Cd * A * rho * this.velocity.x * this.velocity.x * this.velocity.x / Math.abs(this.velocity.x);
    var Fy = -0.5 * Cd * A * rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);
    //check for non numbers and handle
    Fx = (isNaN(Fx) ? 0 : Fx);
    Fy = (isNaN(Fy) ? 0 : Fy);

    // Calculate acceleration ( F = ma )
    var ax = Fx / this.mass;
    var ay = ag + (Fy / this.mass);

    // Integrate to get velocity
    this.velocity.x += ax*(1/40);
    this.velocity.y += ay*(1/40);

    // Integrate to get position
    //multiply by the framerate to change speed
    this.position.x += this.velocity.x*(1/1000);
    this.position.y += -(this.velocity.y*(1/1000));

    // if(this.lifeTime > 0){
    //   this.position.x += this.velocity.x * dt * 0.03;
    //   this.position.y += this.velocity.y * dt * 0.03;
    //   this.color[3] = this.lifeTime;
    // }

    this.lifeTime -= dt; //handle the lifetime of the particle by derementing by delta time
    if(this.lifeTime > 0){
      this.color[3] = this.lifeTime; //change the alpha channel of the particle by time alive
    }

    if (this.position.y < -1) {
        this.velocity.y *= this.restitution;
        this.position.y = -1;
    }
    if (this.position.y > 1) {
        this.velocity.y *= this.restitution;
        this.position.y = 1;
    }
    if (this.position.x > 1) {
        this.velocity.x *= this.restitution;
        this.position.x = 1;
    }
    if (this.position.x < -1) {
        this.velocity.x *= this.restitution;
        this.position.x = -1;
    }


    if(this.lifeTime <= 0){
      this.position.x = 0;
      this.position.y = 0;
      this.velocity = {
        x: (slider.value * Math.cos(this.angl)),
        y: -(slider.value * Math.sin(this.angl))
      }
      this.color[3] = 1.0;
      this.lifeTime = Math.random() * 5;
    }
  }
}
