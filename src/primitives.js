
class Primitives{
  constructor(type, sz){
    this.primitiveType = type;
    this.size = sz;
  }
}

class Cube extends Primitives{
  constructor(sz){
    super("Cube", sz);
    this.vertices = [
      // Front face
      -sz, 0,  sz,
      sz, 0,  sz,
      -sz,  sz,  sz,
      sz,  sz,  sz,

      // Back face
      -sz, 0, -sz,
      -sz,  sz, -sz,
       sz,  0, -sz,
       sz, sz, -sz,

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
       sz,  0,  sz,
       sz, sz,  sz,

      // Left face
      -sz, 0, -sz,
      -sz, 0,  sz,
      -sz,  sz,  -sz,
      -sz,  sz, sz
    ]
    this.color = [
      Math.random(),  Math.random(),  Math.random(),  1.0,    // Front face: white
    ];
    this.genBuffers();
    this.genUniforms();
  }

  genBuffers(){
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  associateBuffers(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    var coord = gl.getAttribLocation(program, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
  }

  genUniforms(){
    this.u_model = gl.getUniformLocation(program, "u_model");
    this.u_color = gl.getUniformLocation(program, "u_color");
  }

  setUniforms(){
    gl.uniformMatrix4fv(this.u_model, false, new Mat4().array);
    gl.uniform4fv(this.u_color, this.color);
  }
}
