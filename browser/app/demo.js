
import { shader } from './engine/shader';
import { mouse } from './engine/mouse';
import { camera } from './engine/camera';
import { buffer } from './engine/buffer';
import Geometry from './engine/geometry';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export default function() {

	const uniforms = {
		resolution: [gl.canvas.width, gl.canvas.height],
		time: 0.0,
	};

	Object.keys(buffer).forEach(key => {
		buffer[key].uniforms = uniforms;
	});

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);

	shader.load(function() {
		requestAnimationFrame(animate);
	});

	function animate(elapsed) {
		elapsed = elapsed/1000.0;
		mouse.update(elapsed);
		if (mouse.clic) {
			camera.rotation[0] += mouse.delta.x * 0.01;
			camera.rotation[1] -= mouse.delta.y * 0.01;
		}
		camera.update(elapsed);

		uniforms.time = elapsed;
		uniforms.cameraPosition = camera.position;
		uniforms.viewProjection = camera.viewProjection;

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(0,0,0,1);

		draw(buffer["particle"]);
		draw(buffer["ribbon"]);

		requestAnimationFrame(animate);
	}

	function draw (buffer) {
		const programInfo = shader.program[buffer.material];
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, buffer.info);
		twgl.setUniforms(programInfo, buffer.uniforms);
		twgl.drawBufferInfo(gl, buffer.info);
	}

	function onWindowResize() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);
		camera.resize();
	}
}
