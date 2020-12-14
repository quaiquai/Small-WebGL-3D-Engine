var VS_shadow = `
  attribute vec3 coordinates;
  attribute vec2 a_texcoord;

  uniform mat4 u_model;
  uniform mat4 view;
  uniform mat4 projection;

  void main(){
    gl_Position = projection * view * u_model * vec4(coordinates, 1.0);
  }
`
