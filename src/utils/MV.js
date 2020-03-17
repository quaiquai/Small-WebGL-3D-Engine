//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//
//  Vector Matrix library functions
//

function _argumentsToArray( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

//----------------------------------------------------------------------------

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

function vec2()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    }

    return result.splice( 0, 2 );
}

function vec3()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    }

    return result.splice( 0, 3 );
}

function vec4()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec2( v[0],  0.0 ),
            vec2(  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec2(v) );  v.splice( 0, 2 );
        m.push( vec2(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat3()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec3( v[0],  0.0,  0.0 ),
            vec3(  0.0, v[0],  0.0 ),
            vec3(  0.0,  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat4()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec4( v[0], 0.0,  0.0,   0.0 ),
            vec4( 0.0,  v[0], 0.0,   0.0 ),
            vec4( 0.0,  0.0,  v[0],  0.0 ),
            vec4( 0.0,  0.0,  0.0,  v[0] )
        ];
        break;

    default:
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if ( u.length != v.length ) { return false; }

    if ( u.matrix && v.matrix ) {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) { return false; }
            for ( var j = 0; j < u[i].length; ++j ) {
                if ( u[i][j] !== v[i][j] ) { return false; }
            }
        }
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        return false;
    }
    else {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i] !== v[i] ) { return false; }
        }
    }

    return true;
}

//----------------------------------------------------------------------------

function add( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "add(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "add(): trying to add matrices of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] + v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "add(): trying to add matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "add(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] + v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function subtract( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "subtract(): trying to subtract matrices" +
                " of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "subtract(): trying to subtact matrices" +
                    " of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] - v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "subtact(): trying to subtact  matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "subtract(): vectors are not the same length";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] - v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function mult( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "mult(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "mult(): trying to add matrices of different dimensions";
            }
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( [] );

            for ( var j = 0; j < v.length; ++j ) {
                var sum = 0.0;
                for ( var k = 0; k < u.length; ++k ) {
                    sum += u[i][k] * v[k][j];
                }
                result[i].push( sum );
            }
        }

        result.matrix = true;

        return result;
    }
    else {
        if ( u.length != v.length ) {
            throw "mult(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] * v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][3] = x;
    result[1][3] = y;
    result[2][3] = z;

    return result;
}

//----------------------------------------------------------------------------

function rotate( angle, axis )
{
    if ( !Array.isArray(axis) ) {
        axis = [ arguments[1], arguments[2], arguments[3] ];
    }

    var v = normalize( axis );

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos( radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( radians(angle) );

    var result = mat4(
        vec4( x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s, 0.0 ),
        vec4( x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s, 0.0 ),
        vec4( x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c,   0.0 ),
        vec4()
    );

    return result;
}

//----------------------------------------------------------------------------

function scale( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}
//----------------------------------------------------------------------------
function shear( x, y )
{
    var result = mat4();
    result[0][1] = y;
    result[1][0] = x;
    result[2][2] = 1;

    return result;
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt( eye, at, up )
{
    if ( !Array.isArray(eye) || eye.length != 3) {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( !Array.isArray(at) || at.length != 3) {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if ( !Array.isArray(up) || up.length != 3) {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( equal(eye, at) ) {
        return mat4();
    }

    var v = normalize( subtract(at, eye) );  // view direction vector
    var n = normalize( cross(v, up) );       // perpendicular vector
    var u = normalize( cross(n, v) );        // "new" up vector

    v = negate( v );

    var result = mat4(
        vec4( n, -dot(n, eye) ),
        vec4( u, -dot(u, eye) ),
        vec4( v, -dot(v, eye) ),
        vec4()
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = mat4();
    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;
    result[0][3] = (left + right) / w;
    result[1][3] = (top + bottom) / h;
    result[2][3] = (near + far) / d;

    return result;
}

//----------------------------------------------------------------------------

function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;

    return result;
}

//----------------------------------------------------------------------------
//
//  Vector Functions
//

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

//----------------------------------------------------------------------------

function negate( u )
{
    result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( -u[i] );
    }

    return result;
}

//----------------------------------------------------------------------------

function cross( u, v )
{
    if ( !Array.isArray(u) || u.length < 3 ) {
        throw "cross(): first argument is not a vector of at least 3";
    }

    if ( !Array.isArray(v) || v.length < 3 ) {
        throw "cross(): second argument is not a vector of at least 3";
    }

    var result = [
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    ];

    return result;
}

//----------------------------------------------------------------------------

function length( u )
{
    return Math.sqrt( dot(u, u) );
}

//----------------------------------------------------------------------------

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

//----------------------------------------------------------------------------

function mix( u, v, s )
{
    if ( typeof s !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }

    if ( u.length != v.length ) {
        throw "vector dimension mismatch";
    }

    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( s * u[i] + (1.0 - s) * v[i] );
    }

    return result;
}

function inverse(m){
  var m00 = m[0 * 4 + 0];
  var m01 = m[0 * 4 + 1];
  var m02 = m[0 * 4 + 2];
  var m03 = m[0 * 4 + 3];
  var m10 = m[1 * 4 + 0];
  var m11 = m[1 * 4 + 1];
  var m12 = m[1 * 4 + 2];
  var m13 = m[1 * 4 + 3];
  var m20 = m[2 * 4 + 0];
  var m21 = m[2 * 4 + 1];
  var m22 = m[2 * 4 + 2];
  var m23 = m[2 * 4 + 3];
  var m30 = m[3 * 4 + 0];
  var m31 = m[3 * 4 + 1];
  var m32 = m[3 * 4 + 2];
  var m33 = m[3 * 4 + 3];
  var tmp_0  = m22 * m33;
  var tmp_1  = m32 * m23;
  var tmp_2  = m12 * m33;
  var tmp_3  = m32 * m13;
  var tmp_4  = m12 * m23;
  var tmp_5  = m22 * m13;
  var tmp_6  = m02 * m33;
  var tmp_7  = m32 * m03;
  var tmp_8  = m02 * m23;
  var tmp_9  = m22 * m03;
  var tmp_10 = m02 * m13;
  var tmp_11 = m12 * m03;
  var tmp_12 = m20 * m31;
  var tmp_13 = m30 * m21;
  var tmp_14 = m10 * m31;
  var tmp_15 = m30 * m11;
  var tmp_16 = m10 * m21;
  var tmp_17 = m20 * m11;
  var tmp_18 = m00 * m31;
  var tmp_19 = m30 * m01;
  var tmp_20 = m00 * m21;
  var tmp_21 = m20 * m01;
  var tmp_22 = m00 * m11;
  var tmp_23 = m10 * m01;

  var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

  var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  return [
    d * t0,
    d * t1,
    d * t2,
    d * t3,
    d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
    d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
    d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
    d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
    d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
    d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
    d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
    d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
    d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
    d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
    d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
    d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
  ];
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

/*
function scale( s, u )
{
    if ( !Array.isArray(u) ) {
        throw "scale: second parameter " + u + " is not a vector";
    }

    result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( s * u[i] );
    }

    return result;
}
*/

//----------------------------------------------------------------------------
//
//
//

function flatten( v )
{
    // if ( v.matrix === true ) {
    //     v = transpose( v );
    // }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}
