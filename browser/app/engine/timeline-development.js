import * as THREE from 'three.js';

let time = 0;
let connected = false;

blenderWS.addListener('time', function(newTime) {
	time = newTime;
	connected = true;
});

export function start() {
}

export function getTime() {
	if (connected)
		return time;
	else
		return 0;
}

export function getDuration() {
	return 100000000;
}