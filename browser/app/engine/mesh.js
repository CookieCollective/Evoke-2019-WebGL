
import Geometry from './geometry';
import { shader } from './shader';
import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");

export var mesh = {};

mesh.particle = Geometry.create(Geometry.random(1000))[0];
mesh.ribbon = Geometry.create(Geometry.random(1), [1,500])[0];
mesh.quad = {
	position: [ -1,-1,0, 1,-1,0, 1,1,0, -1,1,0 ],
	texcoord: [ 0,0, 1,0, 1,1, 0,1 ],
	indices: [ 0,1,2, 2,3,0 ],
};

Object.keys(mesh).forEach(key => {
	mesh[key] = twgl.createBufferInfoFromArrays(gl, mesh[key]);
})