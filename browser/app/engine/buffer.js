
import Geometry from './geometry';
import { shader } from './shader';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export var buffer = {};

buffer.particle = {
	attributes: Geometry.create(Geometry.random(10))[0],
	material: "particle",
};

buffer.quad = {
	attributes: {
		position: [ -1,-1,0, 1,-1,0, 1,1,0, -1,1,0 ],
		texcoord: [ 0,0, 1,0, 1,1, 0,1 ],
		indices: [ 0,1,2, 2,3,0 ],
	},
	material: "render",
};

Object.keys(buffer).forEach(key => {
	buffer[key].info = twgl.createBufferInfoFromArrays(gl, buffer[key].attributes);
	buffer[key].uniforms = {};
});