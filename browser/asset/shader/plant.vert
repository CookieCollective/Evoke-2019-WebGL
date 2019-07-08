
attribute vec3 color;
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget, Points, Scratching, Dust;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec4 vColor;

void main () {

	float size = .04;
	float y = anchor.y * 0.5 + 0.5;
	size *= sin((1.0-y)*PI/2.0);

	vec3 pos = position;

	pos = plantPosition(vec3(0), pos, y);

	vec3 forward = normalize(cameraPos - pos);
	vec3 right = normalize(cross(forward, vec3(0,1,0)));
	vec3 up = normalize(cross(right, forward));
	// pos += right * anchor.x * size;
	pos.y += anchor.x * size;

	vColor = vec4(color, 1);
	vUV = anchor;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
