
precision mediump float;

uniform float time;
varying vec2 vUV;

void main ()
{
	gl_FragColor = vec4(vUV,0.5+0.5*sin(time),1);
}