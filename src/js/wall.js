class Wall{
  constructor(bottom_l, top_r){
    this.bottom_corner = bottom_l;
    this.top_right = top_r;
    this.values = {
      vertices: [
        this.bottom_corner[0], this.bottom_corner[1], this.bottom_corner[2],
        -this.top_right[0], this.top_right[1], this.bottom_corner[2],
        this.top_right[0], this.top_right[1], this.top_right[2],
        -this.bottom_corner[0], -this.bottom_corner[1], this.top_right[2]
      ],
      color: [
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
      ],
    };
    this.vertexBuffer = gl.createBuffer();
  }
}