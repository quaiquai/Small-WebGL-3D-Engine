var VS_skybox =`
  attribute vec4 coordinates;
  varying vec4 v_position;
  void main() {
    v_position = coordinates;
    gl_Position = coordinates;
    gl_Position.z = 1.0;
  }
`;
