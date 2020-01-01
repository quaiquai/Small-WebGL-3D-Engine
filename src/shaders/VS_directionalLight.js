var VS_directionalLighting = `
	attribute vec3 coordinates;
	attribute vec3 a_normal;
	uniform mat4 u_model;
	uniform mat4 u_view;
	uniform mat4 u_projection;
	varying vec3 v_normal;

	void main(){
		vec4 position = vec4(u_projection * u_view * u_model * vec4(coordinates, 1.0));
		gl_Position = position;
		gl_PointSize = 10.0;
		v_normal = mat3(u_model) * a_normal;
	}`;