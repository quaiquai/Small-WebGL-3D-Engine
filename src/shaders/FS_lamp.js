var FS_lamp = `
	precision mediump float;
	uniform vec4 u_color;
	varying vec3 v_normal;
	void main(){
		vec3 normal = normalize(v_normal);
  	gl_FragColor = vec4(1.0);
	}`;
