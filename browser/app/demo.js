
import { shader } from './engine/shader';
import { mouse } from './engine/mouse';
import { camera } from './engine/camera';
import Geometry from './engine/geometry';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export default function() {

	const attributes = Geometry.create(Geometry.random(10))[0];

	const bufferInfo = twgl.createBufferInfoFromArrays(gl, attributes);
	const uniforms = {
		resolution: [gl.canvas.width, gl.canvas.height],
		time: 0.0,
	};

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);

	shader.load(function() {
		requestAnimationFrame(animate);
	});

	function animate(elapsed) {
		elapsed = elapsed/1000.0;
		uniforms.time = elapsed;
		mouse.update(elapsed);
		camera.update(elapsed);

		if (mouse.clic) {
			camera.rotation[0] += mouse.delta.x * 0.01;
			camera.rotation[1] += mouse.delta.y * 0.01;
		}

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.enable(gl.DEPTH_TEST);
		//gl.enable(gl.CULL_FACE);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(0,0,0,1);

		uniforms.viewProjection = camera.viewProjection;

		var programInfo = shader.program.render;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
		twgl.setUniforms(programInfo, uniforms);
		twgl.drawBufferInfo(gl, bufferInfo);
		requestAnimationFrame(animate);
	}

	function onWindowResize() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);
		camera.resize();
	}
}
