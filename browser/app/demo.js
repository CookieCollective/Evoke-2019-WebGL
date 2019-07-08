
import { shader } from './engine/shader';
import { mouse } from './engine/mouse';
import { camera } from './engine/camera';
import { material } from './engine/material';
import { mesh } from './engine/mesh';
import { vegetal } from './project/vegetal';
import Geometry from './engine/geometry';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export default function() {

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

		// draw(mesh.particle, material.particle);
		// draw(mesh.ribbon, material.ribbon);

		var plant = vegetal.plant;
		uniforms.branchCount = plant.branchCount;
		uniforms.branchPerBranch = plant.branchPerBranch;
		uniforms.color = [0.521, 0.839, 0.541];
		uniforms.noiseRange = 0.5;
		uniforms.noiseScale = 2.0;
		uniforms.twistSin = 1.0;
		uniforms.noiseRangeSub = 0.5;
		uniforms.noiseScaleSub = 4.0;
		uniforms.twistSinSub = 1.0;
		draw(plant.branch, material.branch);
		draw(plant.subbranch, material.subbranch);

		requestAnimationFrame(animate);
	}

	function draw (mesh, material) {
		if (material != null) {
			gl.useProgram(material.program);
			twgl.setBuffersAndAttributes(gl, material, mesh);
			twgl.setUniforms(material, uniforms);
			twgl.drawBufferInfo(gl, mesh);
		}
	}

	function onWindowResize() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);
		camera.resize();
	}
}
