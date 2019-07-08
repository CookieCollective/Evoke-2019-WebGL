
attribute vec3 position;
attribute vec2 texcoord;

varying vec2 vUV;

void main () {
	vUV = texcoord;
	gl_Position = vec4(texcoord * 2.0 - 1.0, 0, 1);
}