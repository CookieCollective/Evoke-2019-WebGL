

import * as twgl from 'twgl';
const gl = document.getElementById("canvas").getContext("webgl");
const m4 = twgl.m4;

export var camera = {};

var distance = 1;
var height = 1;
var position = [0,height,distance];
var target = [0,0,0];
var up = [0,1,0];
var fieldOfView = 60.0;
var near = 0.01;
var far = 100.0;

camera.matrix = m4.lookAt(position, target, up);
camera.view = m4.inverse(camera.matrix);
camera.projection = m4.perspective(fieldOfView * Math.PI / 180.0, gl.canvas.width / gl.canvas.height, near, far);
camera.viewProjection = m4.multiply(camera.projection, camera.view);

camera.rotation = [0,0,0];

camera.update = function () {
	position = m4.getTranslation(
		m4.translate(
			m4.rotateX(
				m4.rotationY(camera.rotation[0]),
			camera.rotation[1]),
		[0,height,distance])
	);
	camera.matrix = m4.lookAt(position, target, [0, 1, 0]);
	camera.view = m4.inverse(camera.matrix);
	camera.viewProjection = m4.multiply(camera.projection, camera.view);
}

camera.resize = function () {
	camera.projection = m4.perspective(
		fieldOfView * Math.PI / 180.0,
		gl.canvas.width / gl.canvas.height,
		near, far);
}