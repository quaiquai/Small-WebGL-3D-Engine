class Plane{
  constructor(sz, h){
    this.size = sz;
    this.height = h;
    this.colors = [0.5, 0.5, 0.5, 1.0,
                  0.5, 0.5, 0.5, 1.0,
                  0.5, 0.5, 0.5, 1.0,
                  0.5, 0.5, 0.5, 1.0];
    this.vertices = [
      -sz, h, -sz,
      -sz, h, sz,
      sz, h, sz,
      sz, h, -sz
    ];
    this.grid = {
      vertices: [],
      colors: [
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0
      ],
      gridLines:0
    };
    let i = 0;
    while (i < sz * 2){
      //verticle lines
      this.grid.vertices.push(-sz + i, h, -sz);
      this.grid.vertices.push(-sz + i, h, sz);
      //horizontal lines
      this.grid.vertices.push(-sz, h, -sz + i);
      this.grid.vertices.push(sz, h, -sz + i);
      i += 0.2
      this.grid.gridLines += 4;
    }
  }
}
