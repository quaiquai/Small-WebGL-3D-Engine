var FS_pointLighting = `
	precision mediump float;
	varying vec3 v_normal;
	varying vec3 v_surfaceToLight;

	uniform vec4 u_color;

	void main(){
  		// because v_normal is a varying it's interpolated
  		// so it will not be a unit vector. Normalizing it
  		// will make it a unit vector again
  		vec3 normal = normalize(v_normal);

  		vec3 surfaceToLightDirection = normalize(v_surfaceToLight);

  		float light = dot(normal, surfaceToLightDirection);

  		gl_FragColor = u_color;
  		// Lets multiply just the color portion (not the alpha)
  		// by the light
  		gl_FragColor.rgb *= light;
	}`;
