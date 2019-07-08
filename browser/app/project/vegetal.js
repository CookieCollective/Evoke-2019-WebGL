
import Geometry from '../engine/geometry';
import { shader } from '../engine/shader';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export var vegetal = {};

vegetal.plant = createPlant(10, 10);

function createPlant (branchCount, branchPerBranch) {
	var branches = Geometry.random(branchCount);
	var leaves = Geometry.random(branchCount*branchPerBranch);
	for (var branch = 0; branch < branchCount; ++branch) {
		for (var leaf = 0; leaf < branchPerBranch; ++leaf) {
			for (var v = 0; v < 3; ++v) {
				leaves.position[branch*branchPerBranch*3+leaf*3+v] = branches.position[branch*3+v];
			}
		}
	}
	var plant = {
		branch: Geometry.create(branches, [1,50])[0],
		subbranch: Geometry.create(leaves, [1,30])[0]
	};

	Object.keys(plant).forEach(key => {
		plant[key] = twgl.createBufferInfoFromArrays(gl, plant[key]);
	});
	
	plant.branchCount = branchCount;
	plant.branchPerBranch = branchPerBranch;

	return plant;
}
