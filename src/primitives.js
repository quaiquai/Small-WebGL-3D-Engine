
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
      sz,  sz,  -sz,
       -sz,  sz,  sz,
       sz,  sz, sz,

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
    this.normals = [
      //Front face
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      //Back face
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,

      //Top face
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      //Bottom face
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      //Right face
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      //left face
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0
    ];
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

    this.nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  associateBuffers(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    var coord = gl.getAttribLocation(program, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
    var norms = gl.getAttribLocation(program, "a_normal");
    gl.vertexAttribPointer(norms, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(norms);
  }

  genUniforms(){
    this.u_model = gl.getUniformLocation(program, "u_model");
    this.u_color = gl.getUniformLocation(program, "u_color");
    this.reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");
  }

  setUniforms(){
    gl.uniformMatrix4fv(this.u_model, false, new Mat4().array);
    gl.uniform4fv(this.u_color, this.color);
    gl.uniform3fv(this.reverseLightDirectionLocation, normalize([0.0, 0.7, 1.0]));
  }
}
