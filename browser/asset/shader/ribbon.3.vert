
attribute vec3 position, anchor, quantity;

uniform mat4 viewProjection;
uniform float time;
uniform vec2 resolution;

varying vec2 vUV;
varying vec4 vColor;
varying vec3 vView, vNormal;

vec3 curve (float ratio) {
	ratio *= PI;
	ratio += mod(time, TAU);
	// ratio += sin(time*2.)+30.;
	float radius = .5;
	radius += .3*sin(ratio+quantity.x*PI);
	vec3 pos = vec3(radius,0,0);
	pos.xy *= rot(quantity.x*PI);
	pos.xz *= rot(quantity.x*PI);
	pos.xz *= rot(ratio*4.);
	pos.yz *= rot(ratio*8.);
	pos.yx *= rot(ratio*3.);
	// pos.x += sin(pos.y + ratio - time) * .2;
	// pos = mix(vec3(0,-1,0), pos, vUV.x);
	// pos.x *= resolution.x / resolution.y;
	return pos;
}

void main () {
	vUV = anchor.xy;
	vColor = vec4(1);
	vec3 pos = normalize(position);
	float angle = time + anchor.y;
	// pos.xy *= rotation(angle * 2.9);
	// pos.zy *= rotation(angle * 1.5);
	// pos.y += anchor.x * 0.02;
	float ratio = (vUV.y*.5+.5) * .2 + quantity.x * 1.;
	pos = curve(ratio);
	pos.x /= resolution.x / resolution.y;
	vec3 next = curve(ratio+0.01);
	vec2 y = normalize(next.xy-pos.xy);
	vec2 x = vec2(y.y,-y.x);

	float radius = 0.01;
	radius += 0.1 * abs(pos.z);

	// vColor *= 1.-abs(pos.z);

	// float fade = 1.0;
	// fade *= smoothstep(0.0, 0.5, vUV.y*0.5+0.5);
	// fade *= (1.-abs(vUV.x));
	// fade *= (1.-abs(vUV.y));

	// radius -= .1 * fade;

	vNormal = normalize(pos);
	// vec3 forward = cross(vNormal, vec3(0,1,0));
	// vec3 right = cross(normalize(forward), vNormal);
	// pos.xyz += right * vUV.x * radius;

	pos.xy += x * vUV.x * radius;
	// pos.y += vUV.x * radius;
	vView = vec3(0,0,-1)-pos.xyz;
	// pos.y *= resolution.x / resolution.y;
	// pos.x *= resolution.x / resolution.y;
	gl_Position = vec4(pos, 1);
}