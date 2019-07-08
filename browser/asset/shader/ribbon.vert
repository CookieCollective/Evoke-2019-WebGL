
attribute vec3 position, anchor, quantity;

uniform mat4 viewProjection;
uniform float time;

varying vec2 vUV;
varying vec4 vColor;

void main () {
	vUV = anchor.xy * 0.5 + 0.5;
	vColor = vec4(1);
	vec3 pos = normalize(position);
	float angle = time + anchor.y;
	pos.xy *= rotation(angle * 2.9);
	pos.zy *= rotation(angle * 1.5);
	pos.x += anchor.x * 0.02;
	gl_Position = viewProjection * vec4(pos, 1);
}