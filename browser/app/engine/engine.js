
import * as THREE from 'three.js';
import * as timeline from '../engine/timeline';
import * as makeText from '../engine/make-text';
import renderer from '../engine/renderer';
import FrameBuffer from '../engine/framebuffer';
import parameters from '../engine/parameters';
import Geometry from '../engine/geometry';
import assets from '../engine/assets';
import * as FX from "postprocessing";
import { gui } from '../engine/gui';
import { OrbitControls } from '../libs/OrbitControls';
import { uniforms, initUniforms, updateUniforms, resizeUniforms } from './uniform';
import { clamp, lerp, lerpArray, lerpVector, lerpArray2, lerpVectorArray, saturate, getRandomPoints } from '../engine/misc';

export var engine = {
	camera: new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 1000),
	target: new THREE.Vector3(),
	scene: null,
	controls: null,
	composer: null,
	framebuffer: null,
	frametarget: null,
	clock: null,
}

export function initEngine () {

	engine.camera.position.x = 0.02;
	engine.camera.position.y = -0.05;
	engine.camera.position.z = 2.0;

	engine.controls = new OrbitControls(engine.camera, renderer.domElement);
	engine.controls.enableDamping = true;
	engine.controls.dampingFactor = 0.1;
	engine.controls.rotateSpeed = 0.1;

	engine.scene = new THREE.Scene();
	// console.log(FX)
	engine.composer = new FX.EffectComposer(renderer);
	// var effectPass = new EffectPass(engine.camera, new BloomEffect());
	// effectPass.renderToScreen = true;
	engine.composer.addPass(new FX.RenderPass(engine.scene, engine.camera));
	engine.composer.addPass(new FX.BloomPass(engine.scene, engine.camera));
	engine.clock = new THREE.Clock();

	initUniforms();

	Object.keys(assets.shaders).forEach(key => assets.shaders[key].uniforms = uniforms);
	timeline.start();

	var branchCount = 10;
	var leafPerBranch = 10;
	var branches = Geometry.random(branchCount);
	var leaves = Geometry.random(branchCount*leafPerBranch);
	for (var branch = 0; branch < branchCount; ++branch) {
		for (var leaf = 0; leaf < leafPerBranch; ++leaf) {
			for (var v = 0; v < 3; ++v) {
				leaves.position.array[branch*leafPerBranch*3+leaf*3+v] = (branches.position.array[branch*3+v]);
			}
		}
	}

	console.log(branches, leaves)
	
	uniforms.branchCount = { value: branchCount };
	uniforms.leafPerBranch = { value: leafPerBranch };

	Geometry.create(branches,[1,100]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.plant)));
	Geometry.create(leaves,[1,100]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.leaf)));
}

var array = [0,0,0];

export function updateEngine (elapsed) {
	elapsed /= 1000;
	engine.controls.update();
	updateUniforms(elapsed);
	engine.composer.render(engine.clock.getDelta());
	// renderer.clear();
	// renderer.render(engine.scene, engine.camera);

}

export function resizeEngine (width, height)
{
	renderer.setSize(width, height);
	engine.camera.aspect = width/height;
	engine.camera.updateProjectionMatrix();
}
