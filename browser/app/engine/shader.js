
import * as twgl from "twgl";
import { loadFiles } from "./loader";
import io from "socket.io-client/dist/socket.io";
const baseUrl = "asset/shader/";
const gl = document.getElementById("canvas").getContext("webgl");

export var shader = {};

shader.preload = [ baseUrl+"header.glsl" ];
shader.list = {
	"particle": ["particle.vert", "color.frag"],
	"ribbon": ["ribbon.vert", "color.frag"],
};
shader.header = "";
shader.data = {};
shader.program = {};
shader.urls = [];
var precision = "precision mediump float;"

Object.keys(shader.list).forEach(key => {
	shader.urls.push(baseUrl+shader.list[key][0]);
	shader.urls.push(baseUrl+shader.list[key][1]);
});

shader.load = function (callback) {
	loadFiles(shader.preload, function(error, contentpreload) {
		Object.keys(contentpreload).forEach(key => {
			shader.header += contentpreload[key] + '\n';
		});
		loadFiles(shader.urls, function(error, content) {
			Object.keys(content).forEach(key => {
				shader.data[key] = content[key];
			});
			Object.keys(shader.list).forEach(key => {
				shader.program[key] = twgl.createProgramInfo(gl, [
					shader.header+shader.data[shader.list[key][0]],
					precision+shader.header+shader.data[shader.list[key][1]]
				]);
			})
			if (callback != null) callback();
		}, function (progress, fileName) {
			console.log("loaded " + fileName);
		})
	}, function (progress, fileName) {
		console.log("preloaded " + fileName);
	});
}

// hot reload

let socket;

function connect() {
	socket = io("http://localhost:5776");
	socket.on("change", change);
	socket.on("disconnect", connect);
}

function change(data) {
	if (data.path.lastIndexOf(baseUrl, 0) === 0) {
		const url = data.path.substr(baseUrl.length);
		Object.keys(shader.list).forEach(key => {
			for (var i = 0; i < 2; ++i) {
				if (shader.list[key][i] === url) {
					loadFiles([baseUrl+shader.list[key][i]], function(error, content) {
						Object.keys(content).forEach(key => {
							shader.data[key] = content[key];
						});
						shader.program[key] = twgl.createProgramInfo(gl, [
							shader.header+shader.data[shader.list[key][0]],
							precision+shader.header+shader.data[shader.list[key][1]]
						]);
						console.log("reloaded " + url);
					}, function (progress, fileName) {
					})
				}
			}
		});
	}
}

connect();