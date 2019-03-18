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

    var viewMatrix, projectionMatrix, modelMatrix;
    var modelViewMatrixLoc, projectionMatrixLoc, modelMatrixLoc;

    window.onload = function init(){
        canvas = document.getElementById("gl-canvas"); //get the canvas instance
        
        gl = WebGLUtils.setupWebGL(canvas); //setup the instance
        if ( !gl ) { alert( "WebGL isn't available" ); }

        gl.viewport( 0, 0, canvas.width, canvas.height ); //set the instance view
        gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); //set clear color of canvas
        gl.enable(gl.DEPTH_TEST);

        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        var house = new LoadOBJ("../objects/cat.obj");
        var objurl = house.loadMeshDataTriangle();
        objurl = objurl.responseText // get the text from the ajax response
        
        data = ObjLoader.domToMesh("house", objurl, true);
        pointsArray = data[1];
        normalsArray = data[2];
        indexArray = data[0];

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

        var nBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, nBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW )

        var nPosition = gl.getAttribLocation( program, "nPosition" );
        gl.vertexAttribPointer( nPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( nPosition );
        
        render();

    }

    function render(){
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        rotAngle += 0.1;

        modelMatrix = new Mat4();
        modelMatrix.translate([0.0,-8.0,-50.0])
        modelMatrix.scale([0.5,0.5,0.5])
        modelMatrix.rotate(90, 1.0, 0.0, 0.0)
        modelMatrix.rotate(rotAngle, 0.0,0.0,1.0)

        viewMatrix = new Mat4();
        viewMatrix.lookAt(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

        projectionMatrix = new Mat4();
        projectionMatrix.setPerspective(80, 1, 0.0001, 10);

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