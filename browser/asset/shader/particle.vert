
attribute vec3 position, anchor, quantity;

uniform mat4 viewProjection;

varying vec2 vUV;

void main () {
	vUV = anchor.xy * 0.5 + 0.5;
	vec3 pos = position;
	pos.xy += anchor.xy * 0.1;
	gl_Position = viewProjection * vec4(pos, 1);
}