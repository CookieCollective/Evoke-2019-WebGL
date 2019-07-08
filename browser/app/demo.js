
import { shader } from './engine/shader';
import { mouse } from './engine/mouse';
import { camera } from './engine/camera';
import { material } from './engine/material';
import { mesh } from './engine/mesh';
import { vegetal } from './project/vegetal';
import Geometry from './engine/geometry';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");
const m4 = twgl.m4;

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
			camera.rotation[1] += mouse.delta.y * 0.01;
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

		for (var index = 0; index < vegetal.plants.length; ++index) {
			uniforms.model = m4.translation([0,0,index*.2]);
			drawPlant(vegetal.plants[index]);
		}

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

	function drawPlant (plant) {
		uniforms.branchCount = plant.branchCount;
		uniforms.branchPerBranch = plant.branchPerBranch;
		uniforms.leafCount = plant.leafCount;
		uniforms.color = plant.color;
		uniforms.noiseRange = plant.noiseRange;
		uniforms.noiseScale = plant.noiseScale;
		uniforms.twistSin = plant.twistSin;
		uniforms.noiseRangeSub = plant.noiseRangeSub;
		uniforms.noiseScaleSub = plant.noiseScaleSub;
		uniforms.twistSinSub = plant.twistSinSub;
		draw(plant.meshes.branch, material.branch);
		draw(plant.meshes.subbranch, material.subbranch);
		draw(plant.meshes.leaf, material.leaf);
	}

	function onWindowResize() {
		twgl.resizeCanvasToDisplaySize(gl.canvas);
		camera.resize();
	}
}
