var VS_pointLighting = `
	attribute vec3 coordinates;
	attribute vec3 a_normal;

	uniform mat4 u_model;
	uniform mat4 u_view;
	uniform mat4 u_projection;
	uniform vec3 u_lightPosition;
	uniform vec3 u_viewPosition;

	varying vec3 v_normal;
	varying vec3 v_surfaceToLight;
	varying vec3 v_surfaceToView;

	void main(){
		vec4 position = vec4(u_projection * u_view * u_model * vec4(coordinates, 1.0));
		gl_Position = position;
		gl_PointSize = 10.0;
		vec3 surfaceWorldPosition = (u_model * vec4(coordinates, 1.0)).xyz; //position of the primitives surface
		v_normal = mat3(u_model) * a_normal;
		v_surfaceToLight = u_lightPosition - surfaceWorldPosition; //direction vector from light to surface of primitive
		v_surfaceToView = u_viewPosition - surfaceWorldPosition; //direction vector from view to surface of primitive
	}`;

