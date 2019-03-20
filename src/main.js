function main(){

    var canvas;
    var gl;
    var program;

    var pointsArray = [];
    var colorsArray = [];
    var indexArray = [];
    var normalsArray = [];
    var texCoordsArray = [];
    var groupData = [];
    var texCoord = [
        new Vec2(0, 0),
        new Vec2(0, 1),
        new Vec2(1, 1),
        new Vec2(1, 0)
    ];

    var rotAngle = 90;
    var cameraPos = 0.0;

    var eye = new Vec3([0.0,0.0,1.0]);
    var center = new Vec3([0.0,0.0,0.0]);
    var up = new Vec3([0.0,1.0,0.0]);

    var viewMatrix, projectionMatrix, modelMatrix;
    var modelViewMatrixLoc, projectionMatrixLoc, modelMatrixLoc;
    var textureCordsLoc, reverseLightDirectionLocation, colorLocation;

    var movingForward, movingBack, movingLeft, movingRight;

    var translatingFactorX = 0.0;
    var translatingFactorZ = 1.0;

    var x = 0;
    var y = 0;

    var direction = [0.0, 0.0];
    var lastX, lastY = 100.0;

    var movement = false;


    window.onload = function init(){
        canvas = document.getElementById("gl-canvas"); //get the canvas instance
        var factor = 100 / canvas.height;
        console.log(factor)

        gl = WebGLUtils.setupWebGL(canvas); //setup the instance
        if ( !gl ) { alert( "WebGL isn't available" ); }

        canvas.requestPointerLock = canvas.requestPointerLock ||canvas.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
        canvas.onclick = function() {
          canvas.requestPointerLock();
        };

        // pointer lock event listeners
        // Hook pointer lock state change events for different browsers
        document.addEventListener('pointerlockchange', lockChangeAlert, false);
        document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

        function lockChangeAlert() {
          if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", updatePosition, false);
          } else {
            console.log('The pointer lock status is now unlocked');
            //document.removeEventListener("mousemove", updatePosition, false);
          }
        }

        function updatePosition(e){
            x = -e.movementX;
            y = -e.movementY;
            console.log(x,y)

            var dx = factor * (x);
            var dy = factor * (y);

            direction[1] = dx;
            direction[0] = dy;
            movement = true;
        }

        gl.viewport( 0, 0, canvas.width, canvas.height ); //set the instance view
        gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); //set clear color of canvas
        gl.enable(gl.DEPTH_TEST);

        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        var house = new LoadOBJ("../objects/The City.obj"); //create a new object to parse and render
        var objurl = house.loadMeshDataTriangle(); // load the text from .obj file to be sent to parser
        objurl = objurl.responseText // get the text from the ajax response

        //Get the model information from the string from .obj
        data = ObjLoader.domToMesh("house", objurl, true);
        pointsArray = data[1]; //vertices of the model
        normalsArray = data[2]; //normals of the model
        indexArray = data[0]; //indices of the model
        texCoordsArray = data[3]; // texture/UV of the model
        // Test the obj data coming in to make sure shifts arnt needed
        //console.log(pointsArray, normalsArray, indexArray, texCoordsArray)

        var vBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW )

        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(indexArray)), gl.STATIC_DRAW);

        modelMatrixLoc = gl.getUniformLocation(program, "modelMatrix");
        modelViewMatrixLoc = gl.getUniformLocation( program, "viewMatrix" );
        projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
        reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");
        colorLocation = gl.getUniformLocation(program, "u_color");

        var nBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, nBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW )

        var nPosition = gl.getAttribLocation( program, "nPosition" );
        gl.vertexAttribPointer( nPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( nPosition );

        var tBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);

        textureCordsLoc = gl.getAttribLocation(program, "tPosition");
        gl.vertexAttribPointer(textureCordsLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(textureCordsLoc);

        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));

        // Asynchronously load an image
        var image = new Image();
        image.src = "../textures/Cat_bump.jpg";
        image.addEventListener('load', function() {
          // Now that the image has loaded make copy it to the texture.
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
          gl.generateMipmap(gl.TEXTURE_2D);
        });

        viewMatrix = new Mat4();
        viewMatrix.lookAt(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

        modelMatrix = new Mat4();
        modelMatrix.translate([0.0,-120.0,-500.0])
        modelMatrix.scale([0.5,0.5,0.5])
        modelMatrix.rotate(90, 0.0, 1.0, 0.0)


        // modelMatrix.translate([0.0,-8.0,-50.0])
        // modelMatrix.scale([0.5,0.5,0.5])
        // modelMatrix.rotate(90, 1.0, 0.0, 0.0)
        // modelMatrix.rotate(90, 0.0,0.0,1.0);



        projectionMatrix = new Mat4();
        projectionMatrix.setPerspective(80, canvas.width/canvas.height, 0, 10);

        render();

    }

    function render(){

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        ////////////////////////////////
        //keyboard movement controls could probably be done better and more efficiently
        ////////////////////////////////
        //Detect that the keys are pressed and change their state to true for movement.
        document.onkeydown = function(ev){
            switch(ev.keyCode)
            {
                case 38:
                movingForward = true;
                translatingFactorZ += 0.1;
                break;
                case 37:
                movingRight = true;
                translatingFactorX += 0.1;
                break;
                case 39:
                movingLeft = true;
                translatingFactorX -= 0.1;
                break;
                case 40:
                movingBack = true;
                translatingFactorZ -= 0.1;
                break;
                default:
                break;
            }
          };
        //detect that the movement has stopped and reset the translation factor back to 0.0 for next movement to have correct calc
        document.onkeyup = function(ev){
            switch(ev.keyCode)
            {
                case 38:
                movingForward = false;
                translatingFactorZ = 0.0;
                break;
                case 37:
                movingRight = false;
                translatingFactorX = 0.0;
                break;
                case 39:
                movingLeft= false;
                translatingFactorX = 0.0;
                break;
                case 40:
                movingBack = false;
                translatingFactorZ = 0.0;
                break;
                default:
                break;
            }
          };

        //incremental angles to be used for auto modelMatrix rotations
        rotAngle += 0.0000001;
        cameraPos += 0.01;

        gl.uniform3fv(reverseLightDirectionLocation, normalize([0.5, 0.7, 1])); //light direction (currently upper right)
        gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]); // green color when active


        // When movement is detected, the camera is translated from current position
        // in the direction indicated by the variable and its factor
        if(movingForward == true){
          modelMatrix.translate([0.0, 0.0, translatingFactorZ]);
        }
        else if(movingBack == true){
          modelMatrix.translate([0.0, 0.0, translatingFactorZ]);
        }
        else if(movingLeft == true){
          modelMatrix.translate([translatingFactorX, 0.0, 0.0]);
        }
        else if(movingRight == true){
          modelMatrix.translate([translatingFactorX, 0.0, 0.0]);
        }

        if (movement == true){
          viewMatrix.rotate(direction[0], 1.0, 0.0, 0.0);
          viewMatrix.rotate(direction[1], 0.0, 1.0, 0.0);
          movement = false;
        }

        gl.uniformMatrix4fv(modelViewMatrixLoc, false, viewMatrix.array);
        gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix.array);
        gl.uniformMatrix4fv(modelMatrixLoc, false, modelMatrix.array);

        gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(render)
    }

    function flatten(v)
    {
        let n = v.length;
        let elemsAreArrays = false;

        if (Array.isArray(v[0])) {
            elemsAreArrays = true;
            n *= v[0].length;
        }

        var floats = new Float32Array(n);

        if (elemsAreArrays) {
            let idx = 0;
            for (let i = 0; i < v.length; ++i) {
                for (let j = 0; j < v[i].length; ++j) {
                    floats[idx++] = v[i][j];
                }
            }
            }
        else {
            for (let i = 0; i < v.length; ++i) {
                floats[i] = v[i];
            }
        }

        return floats;
    }

    function normalize( u, excludeLastComponent )
    {
        if ( excludeLastComponent ) {
            var last = u.pop();
        }

        var len = length( u );

        if ( !isFinite(len) ) {
            throw "normalize: vector " + u + " has zero length";
        }

        for ( var i = 0; i < u.length; ++i ) {
            u[i] /= len;
        }

        if ( excludeLastComponent ) {
            u.push( last );
        }

        return u;
    }

    function length( u )
    {
        return Math.sqrt( dot(u, u) );
    }

    function dot( u, v )
    {
        if ( u.length != v.length ) {
            throw "dot(): vectors are not the same dimension";
        }

        var sum = 0.0;
        for ( var i = 0; i < u.length; ++i ) {
            sum += u[i] * v[i];
        }

        return sum;
    }

}
