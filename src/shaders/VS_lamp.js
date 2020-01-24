var VS_lamp = `
	attribute vec3 coordinates;
	attribute vec3 a_normal;

	uniform mat4 u_model;
	uniform mat4 u_view;
	uniform mat4 u_projection;

	void main(){
		vec4 position = vec4(u_projection * u_view * u_model * vec4(coordinates, 1.0));
		gl_Position = position;
	}`;
