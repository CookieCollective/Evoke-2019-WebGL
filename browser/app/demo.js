
import { assets } from './assets';
import Mouse from './engine/mouse';
import * as twgl from 'twgl';

export default function() {

	const gl = document.getElementById("canvas").getContext("webgl");
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
	var programInfo;

	assets.load(function() {
		programInfo = twgl.createProgramInfo(gl, [assets["fullscreen.vert"], assets["render.frag"]]);
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', Mouse.onMove, false);
		requestAnimationFrame(animate);
		onWindowResize();
	});

	function animate(elapsed) {
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
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
