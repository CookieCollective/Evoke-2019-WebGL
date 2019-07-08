
attribute vec3 position, anchor, quantity;

uniform mat4 viewProjection;
uniform float time;

varying vec2 vUV;
varying vec4 vColor;

void main () {
	vUV = anchor.xy * 0.5 + 0.5;
	vColor = vec4(1);
	vec3 pos = position;
	pos.xy *= rotation(time + anchor.y);
	pos.zy *= rotation(time + anchor.y);
	pos.xy += anchor.xy * 0.01;
	gl_Position = viewProjection * vec4(pos, 1);
}