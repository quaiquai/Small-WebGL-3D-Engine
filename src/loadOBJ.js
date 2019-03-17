/*
File to handle loading in .obj models and their properties such as positions, normals, indicies etc.
@created by Matthew McQuaigue 
@date 3/16/2019
*/

class LoadOBJ{
    constructor(objFileName){
        this.url = "objFileName";
        this.textures = [];
    }

    function addTexture(textureFileName){
        if(typeof textureFileName != 'string'){
            console.error("Texture Filename must be a string");
        }
        this.textures.push(textureFileName);
    }

    function getLastTexture(){
        return this.textures[this.textures.length-1];
    }

    function getAllTextures(){
        return this.textures;
    }
}
