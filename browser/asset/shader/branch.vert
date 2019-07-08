
attribute vec3 position, anchor, quantity;

uniform mat4 viewProjection, model;
uniform vec3 color;
uniform float time;
uniform float twistSin, noiseScale, noiseRange;

varying vec2 vUV;
varying vec4 vColor;

void main () {
	vec3 pos = position;
	float size = .02;
	float y = anchor.y * 0.5 + 0.5;
	
	pos = branchPosition(vec3(0), pos, y, twistSin, noiseScale, noiseRange);
	size *= sin((1.0-y)*PI/2.0);
	pos.y += anchor.x * size;

	vColor = vec4(color*y, 1);
	vUV = anchor.xy;
	gl_Position = viewProjection * model * vec4(pos, 1);
}
