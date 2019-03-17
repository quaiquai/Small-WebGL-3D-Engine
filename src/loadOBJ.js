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

    
}

