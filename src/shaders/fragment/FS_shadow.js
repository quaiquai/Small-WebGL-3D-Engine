var FS_shadow = `
  precision mediump float;

  uniform vec4 u_color;

  void main(){
    gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 0.0);
  }
`
