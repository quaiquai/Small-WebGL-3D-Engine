//
//  initShaders.js
//

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    var vertShdr;
    var fragShdr;

    var vertElem = document.getElementById( vertexShaderId );
    if ( !vertElem ) { 
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }
    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER );
        gl.shaderSource( vertShdr, vertElem.text );
        gl.compileShader( vertShdr );
        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
            var msg = "Vertex shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( vertShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    var fragElem = document.getElementById( fragmentShaderId );
    if ( !fragElem ) { 
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
        gl.shaderSource( fragShdr, fragElem.text );
        gl.compileShader( fragShdr );
        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            var msg = "Fragment shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }

    return program;
}


// function that does all shader initializations and 
// returns the compiled shader program
function createShaders (vs, fs) {
                // Create program object
    program = gl.createProgram();

    var compiled;

    // load vertex gouraud shader
    var vertexGouraudShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexGouraudShader, vs);
    gl.compileShader(vertexGouraudShader);
    gl.attachShader(program, vertexGouraudShader);
    compiled = gl.getShaderParameter(vertexGouraudShader, gl.COMPILE_STATUS);
    if (!compiled) {
        console.error(gl.getShaderInfoLog(vertexGouraudShader));
        console.log (gl.getShaderInfoLog(vertexGouraudShader));
    }

    // load fragment gouraud shader
    var fragmentGouraudShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentGouraudShader, fs);
    gl.compileShader(fragmentGouraudShader);
    gl.attachShader(program, fragmentGouraudShader);
    compiled = gl.getShaderParameter(fragmentGouraudShader, gl.COMPILE_STATUS);
    if (!compiled) {
        console.error(gl.getShaderInfoLog(fragmentGouraudShader));
    }

    gl.linkProgram(program);


    //  Link program
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        console.error(gl.getProgramInfoLog(program));
        console.log (gl.getProgramInfoLog(program));
    }
    return program;
}
