
attribute vec3 color;
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget, Points, Scratching, Dust;
uniform vec2 resolution;
uniform float time;
uniform float branchCount, leafPerBranch;
varying vec2 vUV;
varying vec4 vColor;

void main () {

	float size = .02;
	// float y = anchor.y * 0.5 + 0.5;
	float y = mod(quantity.y, leafPerBranch)/leafPerBranch;
	y = y * 0.9 + 0.1;

	vec3 pos = position;

	vec3 origin = plantPosition(vec3(0), pos, y);

	y = anchor.y * 0.5 + 0.5;
	size *= sin((1.0-y)*PI/2.0);
	pos = plantPosition(origin,origin+0.2*vec3(random(pos.xz), random(pos.yz), random(pos.xy)), y);

	vec3 forward = normalize(cameraPos - pos);
	vec3 right = normalize(cross(forward, vec3(0,1,0)));
	vec3 up = normalize(cross(right, forward));
	pos.y += anchor.x * size;
	// pos += up * anchor.y * size;

	vColor = vec4(1);
	vUV = anchor;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
