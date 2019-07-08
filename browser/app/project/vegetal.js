
import Geometry from '../engine/geometry';
import { shader } from '../engine/shader';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export var vegetal = {};

vegetal.plants = [
	createPlant({
		branchCount: 9,
		branchPerBranch: 9,
		leafCount: 20,
		color: [0.984, 0.854, 0.196],
	}),
	createPlant({
		branchCount: 9,
		branchPerBranch: 9,
		leafCount: 20,
		color: [0.941, 0.258, 0.321],
	}),
	createPlant({
		branchCount: 9,
		branchPerBranch: 9,
		leafCount: 20,
		color: [0.258, 0.333, 0.941],
	})];

function createPlant (options) {
	var branchCount = options.branchCount || 9;
	var branchPerBranch = options.branchPerBranch || 9;
	var leafCount = options.leafCount || 20;
	var branches = Geometry.random(branchCount);
	var subbranches = Geometry.random(branchCount*branchPerBranch);
	var leaves = Geometry.random(branchCount*branchPerBranch*leafCount);
	for (var branch = 0; branch < branchCount; ++branch) {
		for (var sub = 0; sub < branchPerBranch; ++sub) {
			for (var v = 0; v < 3; ++v) {
				subbranches.position[branch*branchPerBranch*3+sub*3+v] = branches.position[branch*3+v];
			}
			for (var leaf = 0; leaf < leafCount; ++leaf) {
				for (var v = 0; v < 3; ++v) {
					leaves.position[branch*branchPerBranch*leafCount*3+sub*leafCount*3+leaf*3+v] = branches.position[branch*3+v];
				}
			}
		}
	}
	var plant = {
		meshes : {
			branch: Geometry.create(branches, [1,50])[0],
			subbranch: Geometry.create(subbranches, [1,30])[0],
			leaf: Geometry.create(leaves, [1,4])[0],
		},
		branchCount: branchCount,
		branchPerBranch: branchPerBranch,
		leafCount: leafCount,
		color: options.color || [0.258, 0.941, 0.262],
		noiseRange: options.noiseRange || 0.1,
		noiseScale: options.noiseScale || 2.0,
		twistSin: options.twistSin || 1.0,
		noiseRangeSub: options.noiseRangeSub || 0.4,
		noiseScaleSub: options.noiseScaleSub || 4.0,
		twistSinSub: options.twistSinSub || 1.0,
	};

	Object.keys(plant.meshes).forEach(key => {
		plant.meshes[key] = twgl.createBufferInfoFromArrays(gl, plant.meshes[key]);
	});

	return plant;
}
