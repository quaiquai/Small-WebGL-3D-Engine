function main(){

    var canvas;
    var gl;
    var program;

    var pointsArray = [];
    var colorsArray = [];
    var normalsArray = [];
    var texCoordsArray = [];
    var groupData = [];
    var texCoord = [
        new Vec2(0, 0),
        new Vec2(0, 1),
        new Vec2(1, 1),
        new Vec2(1, 0)
    ];

    var modelViewMatrix, projectionMatrix;
    var modelViewMatrixLoc, projectionMatrixLoc;

    window.onload = function init(){
        canvas = document.getElementById("gl-canvas"); //get the canvas instance
        
        gl = WebGLUtils.setupWebGL(canvas); //setup the instance
        if ( !gl ) { alert( "WebGL isn't available" ); }

        gl.viewport( 0, 0, canvas.width, canvas.height ); //set the instance view
        gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); //set clear color of canvas
        gl.enable(gl.DEPTH_TEST);

        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        var house = new LoadOBJ("../objects/simple_house.obj");
        var objurl = house.loadMeshDataTriangle();
        objurl = objurl.responseText // get the text from the ajax response
        
        data = loadMeshData(objurl);

        var nBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

        var vNormal = gl.getAttribLocation( program, "vNormal" );
        gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vNormal );

        var vBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW )
        
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );

        modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
        projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );


        render();

    }

    function render(){
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        modelViewMatrix = new Mat4();
        modelViewMatrix.lookAt(0.0, 0.0, 5.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

        projectionMatrix = new Mat4();
        projectionMatrix.setPerspective(90, 1, 1.0, 2000);

        gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

        gl.drawArrays(gl.TRIANGLES, 0, pointsArray.length);
    }

    function loadMeshData(string) {
        var lines = string.split("\n");
        var positions = [];
        var normals = [];
        var vertices = [];

        for ( var i = 0 ; i < lines.length ; i++ ) {
            var parts = lines[i].trimRight().split(' ');
            if ( parts.length > 0 ) {
                switch(parts[0]) {
                    case 'v':  positions.push(
                        vec3.fromValues(
                            parseFloat(parts[1]),
                            parseFloat(parts[2]),
                            parseFloat(parts[3])
                        ));
                    break;
                    case 'vn':
                        normals.push(
                            vec3.fromValues(
                            parseFloat(parts[1]),
                            parseFloat(parts[2]),
                            parseFloat(parts[3])
                        ));
                        break;
                        case 'f': {
                            var f1 = parts[1].split('/');
                            var f2 = parts[2].split('/');
                            var f3 = parts[3].split('/');
                            Array.prototype.push.apply(
                                vertices, positions[parseInt(f1[0]) - 1]
                            );
                            Array.prototype.push.apply(
                                vertices, normals[parseInt(f1[2]) - 1]
                            );
                            Array.prototype.push.apply(
                                vertices, positions[parseInt(f2[0]) - 1]
                            );
                            Array.prototype.push.apply(
                                vertices, normals[parseInt(f2[2]) - 1]
                            );
                            Array.prototype.push.apply(
                                vertices, positions[parseInt(f3[0]) - 1]
                            );
                            Array.prototype.push.apply(
                                vertices, normals[parseInt(f3[2]) - 1]
                            );
                        break;
                        }
                    }
                }
            }
            var vertexCount = vertices.length / 6;
            console.log("Loaded mesh with " + vertexCount + " vertices");
            return {
                primitiveType: 'TRIANGLES',
                vertices: new Float32Array(vertices),
                vertexCount: vertexCount
            };
    }
}