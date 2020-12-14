var VS_skybox =`
  attribute vec4 coordinates;
  varying vec4 v_position;
  uniform mat4 u_model;
  void main() {
    v_position = coordinates;
    gl_Position = coordinates;
    gl_Position.z = 1.0;
  }
`;
