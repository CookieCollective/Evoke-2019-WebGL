
attribute vec3 position;
attribute vec2 texcoord;

uniform mat4 viewProjection;

varying vec2 vUV;

void main () {
	vUV = texcoord;
	gl_Position = viewProjection * vec4(position, 1);
}