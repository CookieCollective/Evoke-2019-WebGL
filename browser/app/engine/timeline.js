
const music = document.getElementById('music');
music.load();

export function start() {
	music.play();
}

export function getTime() {
	return music.currentTime;
}

export function getDuration() {
	return music.duration;
}