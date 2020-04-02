/*
File to handle loading in .obj models and their properties such as positions, normals, indicies etc.
@created by Matthew McQuaigue
@date 3/16/2019
*/

class LoadOBJ{

    constructor(objFileName, textures){
        this.url = objFileName;
        this.images = []; // holds the image objects
        if(textures){
            this.textures = textures; // textures passed in to be used
        }else{
            this.textures = [];
        }
        this.data = null;
        this.model = mat4();
        this.color = [
          Math.random(),  Math.random(),  Math.random(),  1.0
        ];
    }

    addTexture(textureFileName){
        if(typeof textureFileName != 'string'){
            console.error("Texture Filename must be a string");
        }
        this.textures.push(textureFileName);
    }

    getLastTexture(){
        return this.textures[this.textures.length-1];
    }

    getAllTextures(){
        return this.textures;
    }

    loadMeshDataTriangle(){
        return $.ajax({
            url: this.url,
            async: false,
            success:function (data){
                if(this.textures != undefined){
                    for (let i = 0; i < this.textures.length-1; i++){
                        this.images[i] = new Image(); //adds image object
                        this.images[i].src = str(this.textures[i]); //assigns image path/src to image object
                    }
                }
                var result = data;
            }
        });
        return result;
    }

    genBuffers(){
      this.vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(this.data[1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      this.nBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(this.data[2]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      console.log(this.data[2])

      this.iBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(this.data[0])), gl.STATIC_DRAW);
    }

    genUniforms(){
      this.u_model = gl.getUniformLocation(currentShader, "u_model");
      this.u_color = gl.getUniformLocation(currentShader, "u_color");
    }

    associateBuffers(){
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
      var coord = gl.getAttribLocation(currentShader, "coordinates");
      gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(coord);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
      var norms = gl.getAttribLocation(currentShader, "a_normal");
      gl.vertexAttribPointer(norms, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(norms);
    }

    setUniforms(){
      gl.uniformMatrix4fv(this.u_model, false, flatten(this.model));
      gl.uniform4fv(this.u_color, this.color);
      if(this.im){
        this.im.bindTexture();
      }
    }
}
