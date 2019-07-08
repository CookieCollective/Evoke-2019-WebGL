
export function arrayVec3Distance(array, index, nextIndex) {
	return distance2(array[index],array[index+1],array[index+2], array[nextIndex],array[nextIndex+1],array[nextIndex+2]);
}

export function getRandomPoints(count) {
	var points = [];
	for (var i = 0; i < count * 3; ++i) points.push(randomRange(-1,1));
	return points;
}

export function decimateAttributes(attributes, step) {
	step = step || 1;
	var att = {};
	var keys = Object.keys(attributes);
	keys.forEach(name => {
		var size = attributes[name].itemSize;
		att[name] = { array: [], itemSize: size};
		for (var i = 0; i < attributes[name].array.length / size; i += step) {
			for (var x = 0; x < size; ++x) {
				var item = attributes[name].array[i*size+x];
				att[name].array.push(item);
			}
		}
	});
	return att;
}

export function randomRange(min, max) {
	return min+Math.random()*(max-min);
}

export function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

export function saturate(value) {
	return Math.max(0, Math.min(1, value));
}

//https://github.com/mattdesl/lerp/blob/master/index.js
export function lerp(v0, v1, t) {
	return v0*(1-t)+v1*t;
}

export function lerpArray(a0, a1, t) {
	for (var i = 0; i < a0.length; ++i) {
		a0[i] = lerp(a0[i], a1[i], t);
	}
	return a0;
}

export function lerpArray2(a0, a1, t, diffTreshold) {
	for (var i = 0; i < a0.length; ++i) {
		if (Math.abs(a0[i] - a1[i]) > diffTreshold) a0[i] = a1[i];
		else a0[i] = lerp(a0[i], a1[i], t);
	}
	return a0;
}

export function lerpVector(a0, a1, t) {
	a0.x = lerp(a0.x, a1.x, t);
	a0.y = lerp(a0.y, a1.y, t);
	a0.z = lerp(a0.z, a1.z, t);
	return a0;
}

export function lerpVectorArray(a0, a1, t) {
	a0.x = lerp(a0.x, a1[0], t);
	a0.y = lerp(a0.y, a1[1], t);
	a0.z = lerp(a0.z, a1[2], t);
	return a0;
}

// Find the closest power of 2
export function closestPowerOfTwo (num) {
	return Math.pow(2, Math.ceil(Math.log(num) / Math.log(2)));
}

// Used to calculate length of vector from center of box to corner of box
export const sqrt3 = Math.sqrt(3);

//
export function distance1(a, b) {
	return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z));
}

//
export function distance2(x,y,z,xx,yy,zz) {
	return Math.sqrt((x-xx)*(x-xx)+(y-yy)*(y-yy)+(z-zz)*(z-zz));
}