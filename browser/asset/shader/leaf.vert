
attribute vec3 position, anchor, quantity;

uniform float time;
uniform float branchCount, branchPerBranch, leafCount;
uniform vec3 color;
uniform mat4 viewProjection, model;
uniform float twistSin, noiseScale, noiseRange;
uniform float twistSinSub, noiseScaleSub, noiseRangeSub;

varying vec2 vUV;
varying vec4 vColor;

void main () {
	float size = .1;
	float y = mod(quantity.y, branchPerBranch)/(branchPerBranch);
	y = 0.2 + 0.8 * y;
	vec3 pos = position;
	vec2 pivot = anchor.xy;
	// pivot *= rot(PI / 4.0);
	pivot.y = pivot.y * 0.5 + 0.5;
	float shape = sin(pivot.y * PI);
	vec3 origin = branchPosition(vec3(0), pos, y, twistSin, noiseScale, noiseRange);
	vec3 direction = vec3(random(pos.xz), random(pos.yz), random(pos.xy)) * 2.0 - 1.0;
	vColor = vec4(color*y, 1);
	size *= 1.-y;
	y = 1.0-mod(quantity.y, leafCount)/leafCount;
	pos = branchPosition(origin,origin+0.2*direction, y, twistSinSub, noiseScaleSub, noiseRangeSub);

	direction = vec3(random(pos.xz), random(pos.yz), random(pos.xy)) * 2.0 - 1.0;
	pos.xyz += pivot.y * direction * size;// * 2.0;
	pos.xyz += pivot.x * normalize(cross(direction, vec3(0,1,0))) * size / 4.0 * shape;

	vUV = anchor.xy;
	gl_Position = viewProjection * model * vec4(pos, 1);
}
