function associateShaders(vs, fs){
    program = createShaders(vs, fs);
    gl.useProgram(program);
 }