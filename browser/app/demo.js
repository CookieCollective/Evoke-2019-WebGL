
import { shader } from './shader';
import Mouse from './engine/mouse';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");
const m4 = twgl.m4;

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

	var projection = m4.perspective(
			60.0 * Math.PI / 180.0,
			gl.canvas.width / gl.canvas.height,
			0.01, 100.0);

	var eye = [0.1, 0.5, 3];
	var target = [0, 0, 0];
	var camera = m4.lookAt(eye, target, [0,1,0]);
	var world = m4.identity;

	shader.load(function() {
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', Mouse.onMove, false);
		requestAnimationFrame(animate);
		onWindowResize();
	});

	function animate(elapsed) {
		uniforms.time = elapsed/1000.0;

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.enable(gl.DEPTH_TEST);
		//gl.enable(gl.CULL_FACE);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(0,0,0,1);

		eye[0] = Math.cos(uniforms.time)*3;
		eye[2] = Math.sin(uniforms.time)*3;

		const camera = m4.lookAt(eye, target, [0, 1, 0]);
		const view = m4.inverse(camera);
		uniforms.viewProjection = m4.multiply(projection, view);

		var programInfo = shader.program.render;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
		twgl.setUniforms(programInfo, uniforms);
		twgl.drawBufferInfo(gl, bufferInfo);
		requestAnimationFrame(animate);
	}

	function onWindowResize() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);
		projection = m4.perspective(
			60.0 * Math.PI / 180.0,
			gl.canvas.width / gl.canvas.height,
			0.01, 100.0);
	}
}
