
import * as twgl from "twgl";
import { loadFiles } from "./loader";
import { material } from "./material";
import io from "socket.io-client/dist/socket.io";
const baseUrl = "asset/shader/";
const gl = document.getElementById("canvas").getContext("webgl");

export var shader = {};

shader.preload = [ "header.glsl", "vegetal.glsl" ];
shader.header = "";
shader.data = {};
shader.program = {};
shader.map = {};
shader.urls = [];
var precision = "precision mediump float;"

Object.keys(material).forEach(key => {
	shader.map[key] = material[key];
	shader.urls.push(baseUrl+shader.map[key][0]);
	shader.urls.push(baseUrl+shader.map[key][1]);
});

shader.load = function (callback) {
	var preload = [];
	for (var index = 0; index < shader.preload.length; ++index) {
		preload.push(baseUrl+shader.preload[index]);
	}
	loadFiles(preload, function(error, contentpreload) {
		Object.keys(contentpreload).forEach(key => {
			shader.header += contentpreload[key] + '\n';
		});
		loadFiles(shader.urls, function(error, content) {
			Object.keys(content).forEach(key => {
				shader.data[key] = content[key];
			});
			Object.keys(material).forEach(key => {
				material[key] = twgl.createProgramInfo(gl, [
					precision+shader.header+shader.data[shader.map[key][0]],
					precision+shader.header+shader.data[shader.map[key][1]]
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
		for (var index = 0; index < shader.preload.length; ++index) {
			if (url === shader.preload[index]) {
				var preload = [];
				for (var index = 0; index < shader.preload.length; ++index) {
					preload.push(baseUrl+shader.preload[index]);
				}
				shader.header = "";
				loadFiles(preload, function(error, content) {
					Object.keys(content).forEach(key => {
						shader.header += content[key] + '\n';
					});
					Object.keys(material).forEach(key => {
						material[key] = twgl.createProgramInfo(gl, [
							precision+shader.header+shader.data[shader.map[key][0]],
							precision+shader.header+shader.data[shader.map[key][1]]
						]);
					})

					console.log("reloaded " + url);
				});
			}
		}
		Object.keys(material).forEach(key => {
			for (var i = 0; i < 2; ++i) {
				if (url === shader.map[key][i]) {
					loadFiles([baseUrl+shader.map[key][i]], function(error, content) {
						Object.keys(content).forEach(key => {
							shader.data[key] = content[key];
						});
						material[key] = twgl.createProgramInfo(gl, [
							precision+shader.header+shader.data[shader.map[key][0]],
							precision+shader.header+shader.data[shader.map[key][1]]
						]);
						console.log("reloaded " + url);
					});
				}
			}
		});
	}
}

connect();