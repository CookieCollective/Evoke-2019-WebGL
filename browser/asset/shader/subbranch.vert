
attribute vec3 position, anchor, quantity;

uniform float time, branchCount, branchPerBranch;
uniform vec3 color;
uniform mat4 viewProjection, model;
uniform float twistSin, noiseScale, noiseRange;
uniform float twistSinSub, noiseScaleSub, noiseRangeSub;

varying vec2 vUV;
varying vec4 vColor;

void main () {
	float size = .02;
	float y = mod(quantity.y, branchPerBranch)/branchPerBranch;
	y = 0.2 + 0.8 * y;
	vec3 pos = position;
	vec3 origin = branchPosition(vec3(0), pos, y, twistSin, noiseScale, noiseRange);
	vec3 direction = vec3(random(pos.xz), random(pos.yz), random(pos.xy)) * 2.0 - 1.0;
	size *= sin((1.0-y)*PI/2.0);
	vColor = vec4(color*y,1);

	y = anchor.y * 0.5 + 0.5;
	pos = branchPosition(origin,origin+0.2*direction, y, twistSinSub, noiseScaleSub, noiseRangeSub);
	size *= 0.2+0.8*sin((1.0-y)*PI/2.0);
	pos.y += anchor.x * size;

	vUV = anchor.xy;
	gl_Position = viewProjection * model * vec4(pos, 1);
}
