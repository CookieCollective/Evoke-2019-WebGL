
attribute vec3 position, next, anchor, quantity;

uniform mat4 viewProjection;

varying vec2 vUV;

void main () {
	vUV = anchor.xy * 0.5 + 0.5;
	float y = anchor.y * 0.5 + 0.5;
	vec4 screen = viewProjection * vec4(position, 1);
	vec4 next = viewProjection * vec4(next, 1);
	vec2 forward = normalize(next.xy-screen.xy);
	vec2 right = vec2(forward.y, -forward.x);
	gl_Position = mix(screen, next, y);
	gl_Position.xy += right * anchor.x * 0.01;
}