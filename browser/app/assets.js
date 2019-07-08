import { loadFiles } from './engine/loader';

export var assets = {};

assets.files = [
	"asset/shader/fullscreen.vert",
	"asset/shader/render.frag"
];

assets.load = function (callback) {
	loadFiles(assets.files, function(error, content) {
		assets = content;
		if (callback != null) callback();
	}, function (progress, fileName) {
		console.log("loaded " + fileName);
	})
}