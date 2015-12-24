import * as pako from 'pako';
import * as base64 from 'base64-js';

const TO_STRING = {to: 'string'};

export const VALOTAS = 'Γιώργος Βαλοτάσιος';

export function deflate(obj) {
	if (!obj) {
		return null;
	}
	const json = JSON.stringify(obj);
	const deflated = pako.deflate(json) as number[];
	return base64.fromByteArray(deflated);
}

export function inflate(input: string) {
	if (!input) {
		return input;
	}
	const bytes = base64.toByteArray(input);
	const restored = pako.inflate(bytes, TO_STRING) as string;
	return JSON.parse(restored);
}