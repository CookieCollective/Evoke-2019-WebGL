
uniform float time;

varying vec4 vColor;
varying vec2 vUV;

varying vec3 vView;
varying vec3 vNormal;

void paper (inout vec4 color) {
	float fade = 1.0;
	// fade *= (1.-abs(vUV.x));
	fade *= (1.-abs(vUV.y));
	fade -= .1 * random(vUV);
	// fade -= .02 * smoothstep(0.1, .8, noise(vUV * 15.));
	// fade -= .1 * noise(vUV * 8. * vec2(1.,10.));
	color.rgb *= fade;
}

void main () {
	gl_FragColor = vColor;
	// gl_FragColor.rgb *= (dot(normalize(vView), normalize(vNormal))*.5+.5);
	// paper(gl_FragColor);
	// gl_FragColor *= .5+.5*sin(vUV.y*PI-time);
	// gl_FragColor.rgb *= smoothstep(0.0, 1.0,  (vUV.y*.5+.5));
	// gl_FragColor.a = 0.0;
}