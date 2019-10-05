
import { loadFile } from "./engine/loader";
import { shader } from './engine/shader';
import { mouse } from './engine/mouse';
import { camera } from './engine/camera';
import { material } from './engine/material';
import { mesh } from './engine/mesh';
import { vegetal } from './project/vegetal';
import fft from 'fft-js';
import Geometry from './engine/geometry';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");
const m4 = twgl.m4;

export default function() {

	const uniforms = {
		resolution: [gl.canvas.width, gl.canvas.height],
		time: 0.0,
	};

	function dft (array) {
		var result = [];
		var baked = ""
		var count = array.length;
		for (var i = 0; i < 12; i++) {
			var x = 0;
			var y = 0;
			for (var n = 0; n < count; n++) {
				var angle = (2. * 3.1415 * i * n) / count;
				x += array[n] * Math.cos(angle);
				y -= array[n] * Math.sin(angle);
			}
			x /= count;
			y /= count;
			var frequency = i;
			var amplitude = Math.sqrt(x*x+y*y);
			var phase = Math.atan2(y,x);
			// result.push([x,y,frequency,amplitude,phase]);
			result.push([amplitude,phase]);


			if (Math.abs(amplitude) > 0.001) {
				if (i > 0) baked += "+";
				var angle = i + phase;
				// baked += "vec2(";
					baked += "cos(";
				if (angle === 0.0) {
					baked += "1."
				} else {
					baked += "t*" + i+"." + "+" + phase.toFixed(2);
					// baked += "cos(t*" + i+"." + "+" + phase.toFixed(3);
					// baked += "),";
					// baked += "sin(t*" + i+"." + "+" + phase.toFixed(3);
					// baked += ")";
				}
					baked += ")";
				// baked += ")";
				baked += "*"+amplitude.toFixed(2);
			}
		}
			// console.log(baked);
		return baked;
	}

	var xs = [];
	var ys = [];
	loadFile('asset/mesh/curve.obj', function(e, data) {
		var lines = data.split('\n');
		for (var l = 0; l < lines.length; ++l) {
			if (lines[l][0] == 'v') {
				var columns = lines[l].split(' ');
				xs.push(Number.parseFloat(columns[1]));
				ys.push(-Number.parseFloat(columns[3]));
			}
		}
		// console.log(dft(xs));
		console.log("vec2("+dft(xs)+","+dft(ys)+");");
		// for (var i = 0; i )
		// if (xs.length % 2 != 0) xs.push(0);
		// if (ys.length % 2 != 0) ys.push(0);
		// var phasors = fft.fft(xs);
		// var frequencies = fft.util.fftFreq(phasors, 60), // Sample rate and coef is just used for length, and frequency step
		    // magnitudes = fft.util.fftMag(phasors); 
		// console.log(frequencies);
		// console.log(magnitudes);

	})

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
		// gl.enable(gl.BLEND);
		// gl.blendFunc(gl.SRC_COLOR, gl.ONE_MINUS_DST_COLOR);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(0,0,0,1);

		// draw(mesh.particle, material.particle);
		// draw(mesh.ribbon, material.ribbon);
		draw(mesh.ribbon, material.ribbon2);

		// for (var index = 0; index < vegetal.plants.length; ++index) {
		// 	uniforms.model = m4.translation([0,0,index*.2]);
		// 	drawPlant(vegetal.plants[index]);
		// }

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
		uniforms.resolution = [gl.canvas.width, gl.canvas.height];
	}
}
