class Primitives{
  constructor(sz){
    this.size = sz;
  }
}

class Cube extends Primitives{
  constructor(sz){
    super(sz);
    this.vertices = [
      // Front face
      -sz, 0,  sz,
      sz, 0,  sz,
      sz,  sz,  sz,
      -sz,  sz,  sz,

      // Back face
      -sz, 0, -sz,
      -sz,  sz, -sz,
       sz,  sz, -sz,
       sz, 0, -sz,

      // Top face
      -sz,  sz, -sz,
      -sz,  sz,  sz,
       sz,  sz,  sz,
       sz,  sz, -sz,

      // Bottom face
      -sz, 0, -sz,
       sz, 0, -sz,
       sz, 0,  sz,
      -sz, 0,  sz,

      // Right face
       sz, 0, -sz,
       sz,  sz, -sz,
       sz,  sz,  sz,
       sz, 0,  sz,

      // Left face
      -sz, 0, -sz,
      -sz, 0,  sz,
      -sz,  sz,  sz,
      -sz,  sz, -sz
    ]
    this.colors = [
      1.0,  1.0,  1.0,  1.0,    // Front face: white
    1.0,  0.0,  0.0,  1.0,    // Back face: red
    0.0,  1.0,  0.0,  1.0,    // Top face: green
    0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
    1.0,  1.0,  0.0,  1.0,    // Right face: yellow
    1.0,  0.0,  1.0,  1.0, // Left face: purple
  ];
  }
}
