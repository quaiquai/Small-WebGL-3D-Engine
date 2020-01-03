var FS_pointLighting = `
	precision mediump float;
	varying vec3 v_normal;
	varying vec3 v_surfaceToLight;
	varying vec3 v_surfaceToView;
	varying vec2 v_texcoord;

	uniform vec4 u_color;
	uniform vec3 u_lightColor;
	uniform vec3 u_specularColor;
	uniform float u_shininess;
	uniform sampler2D u_texture;

	void main(){
  		// because v_normal is a varying it's interpolated
  		// so it will not be a unit vector. Normalizing it
  		// will make it a unit vector again
  		vec3 normal = normalize(v_normal);

  		vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  		vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  		vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

			//distance from object surface to light for attenuation
			float surfaceToLightDistance = length(v_surfaceToLight);

  		float light = dot(normal, surfaceToLightDirection);

			//get the specular highlight value
  		float specular = 0.0;
  		if(light > 0.0){
  			specular = pow(dot(normal, halfVector), u_shininess);
  		}

			//calculate the attenuation of the light using the distance from the
			//objects surface to the light clamping between 0.0 and 1.0 amd apply
			//to the color of the object http://learnwebgl.brown37.net/09_lights/lights_attenuation.html
			float attenuation = clamp(0.5 / surfaceToLightDistance, 0.0, 1.0);

			gl_FragColor = u_color + texture2D(u_texture, v_texcoord);

  		//Lets multiply just the color portion (not the alpha)
  		//by the light
  		gl_FragColor.rgb *= light * u_lightColor;

  		//Just add in the specular
  		gl_FragColor.rgb += specular * u_specularColor;

			//add the attenuation factor
			gl_FragColor.rgb *= attenuation;
	}`;
