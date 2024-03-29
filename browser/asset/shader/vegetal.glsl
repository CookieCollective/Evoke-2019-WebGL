
vec3 branchPosition (vec3 origin, vec3 seed, float ratio, float twistSin, float noiseScale, float noiseRange) {
	vec3 pos = origin-seed;
	float sens = mix(-1.0,1.0,step(random(seed.xy), 0.5));
	float dist = sin(ratio * twistSin) * sens;
	pos.yz *= rot(dist);
	pos.xz *= rot(dist);
	pos.xy *= rot(dist);
	pos += origin;
	pos.x += (noise(noiseScale*(pos))*2.0-1.0)*noiseRange;
	pos.y += (noise(noiseScale*(pos+vec3(2.3210,8.139,43.67)))*2.0-1.0)*noiseRange;
	pos.z += (noise(noiseScale*(pos+vec3(19.49,72.901,91.54)))*2.0-1.0)*noiseRange;
	pos.y = abs(pos.y);
	pos.y += ratio * 0.1 * sens;
	pos = mix(origin, pos, ratio);
	return pos;
}