
attribute vec3 position, anchor, quantity;

uniform float time, branchCount, branchPerBranch;
uniform vec3 color;
uniform mat4 viewProjection;
uniform float twistSin, noiseScale, noiseRange;
uniform float twistSinSub, noiseScaleSub, noiseRangeSub;

varying vec2 vUV;
varying vec4 vColor;

void main () {
	float size = .01;
	float y = mod(quantity.y, branchPerBranch)/branchPerBranch;
	vec3 pos = position;
	vec3 origin = branchPosition(vec3(0), pos, y, twistSin, noiseScale, noiseRange);

	y = anchor.y * 0.5 + 0.5;
	pos = branchPosition(origin,origin+0.2*vec3(random(pos.xz), random(pos.yz), random(pos.xy)), y, twistSinSub, noiseScaleSub, noiseRangeSub);
	size *= sin((1.0-y)*PI/2.0);
	pos.y += anchor.x * size;

	vColor = vec4(color,1);
	vUV = anchor.xy;
	gl_Position = viewProjection * vec4(pos, 1);
}
