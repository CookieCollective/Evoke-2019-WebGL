
import { shader } from './shader';
import Mouse from './engine/mouse';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export default function() {

	const attributes = {
		position: [ -1,-1,0, 1,-1,0, 1,1,0, -1,1,0 ],
		texcoord: [ 0,0, 1,0, 1,1, 0,1 ],
		indices: [ 0,1,2, 2,3,0 ],
	};
	const bufferInfo = twgl.createBufferInfoFromArrays(gl, attributes);
	const uniforms = {
		resolution: [gl.canvas.width, gl.canvas.height],
		time: 0.0,
	};

	shader.load(function() {
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', Mouse.onMove, false);
		requestAnimationFrame(animate);
		onWindowResize();
	});

	function animate(elapsed) {
		uniforms.time = elapsed/1000.0;

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		var programInfo = shader.program.render;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
		twgl.setUniforms(programInfo, uniforms);
		twgl.drawBufferInfo(gl, bufferInfo);
		requestAnimationFrame(animate);
	}

	function onWindowResize() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);
	}
}
