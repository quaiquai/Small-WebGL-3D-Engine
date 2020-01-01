var FS_pointLighting = `
	precision mediump float;
	varying vec3 v_normal;
	varying vec3 v_surfaceToLight;
	varying vec3 v_surfaceToView;

	uniform vec4 u_color;
	uniform vec3 u_lightColor;
	uniform vec3 u_specularColor;
	uniform float u_shininess;

	void main(){
  		// because v_normal is a varying it's interpolated
  		// so it will not be a unit vector. Normalizing it
  		// will make it a unit vector again
  		vec3 normal = normalize(v_normal);

  		vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  		vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  		vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  		float light = dot(normal, surfaceToLightDirection);

  		float specular = 0.0;
  		if(light > 0.0){
  			specular = pow(dot(normal, halfVector), u_shininess);
  		}

  		gl_FragColor = u_color;

  		// Lets multiply just the color portion (not the alpha)
  		// by the light
  		gl_FragColor.rgb *= light * u_lightColor;

  		// Just add in the specular
  		gl_FragColor.rgb += specular * u_specularColor;
	}`;
