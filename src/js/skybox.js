
class Skybox{

  constructor(path){
    this.type = "skybox"

    //vertices for the quad over the screen
    this.vertices = [
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ];

    this.faceInfo = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: '../assets/textures/abovecloudsday/px.png',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: '../assets/textures/abovecloudsday/nx.png',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: '../assets/textures/abovecloudsday/py.png',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: '../assets/textures/abovecloudsday/ny.png',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: '../assets/textures/abovecloudsday/pz.png',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: '../assets/textures/abovecloudsday/nz.png',
      }
    ];

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    this.faceInfo.forEach((faceInfo) => {
      const {target, url} = faceInfo;

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 512;
      const height = 512;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;

      // setup each face so it's immediately renderable
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

      // Asynchronously load an image
      const image = new Image();
      image.src = url;
      image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  }

  genBuffers(){
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  genUniforms(){
    this.skyboxLocation = gl.getUniformLocation(currentShader, 'u_skybox');
    this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(currentShader, 'u_viewDirectionProjectionInverse');
  }

  associateBuffers(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    var coord = gl.getAttribLocation(currentShader, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
  }

  setUniforms(){
    let viewmat = lookatCopy;
    viewmat[0][3] = 0
    viewmat[1][3] = 0
    viewmat[2][3] = 0

    gl.uniformMatrix4fv(this.viewDirectionProjectionInverseLocation,
                        false,
                        inverse(flatten(mult(perspective(90, canvas.width/canvas.height, 0.01, 1000), viewmat))));
    gl.uniform1i(this.skyboxLocation, 0);
  }

}
