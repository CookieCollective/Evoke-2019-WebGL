
import * as twgl from "twgl";
const gl = document.getElementById("canvas").getContext("webgl");

export var material = {
	particle: ["particle.vert", "color.frag"],
	ribbon: ["ribbon.vert", "color.frag"],
	branch: ["branch.vert", "color.frag"],
	subbranch: ["subbranch.vert", "color.frag"],
};