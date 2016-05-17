import * as base64 from 'base64-js';

const TO_STRING = {to: 'string'};

export const VALOTAS = 'Γιώργος Βαλοτάσιος';

export function deflate(obj) {
	if (!obj) {
		return null;
	}
	const json = JSON.stringify(obj);
	const bytes = toByteArray(json);
	return base64.fromByteArray(bytes);
}

function toByteArray(input: string): number[] {
	const array = [];
	for (let i = 0; i < input.length; i++) {
		array.push(input.charCodeAt(i));
	}
	return array;
}

export function inflate(input: string) {
	if (!input) {
		return input;
	}
	const bytes = base64.toByteArray(input);
	const restored = toString(bytes);
	return JSON.parse(restored);
}

function toString (bytes: number[]): string {
	return String.fromCharCode.apply(null, bytes);
}

interface HasMoment {
	moment(): moment.Moment;
}

export function compareMoments(a: HasMoment, b: HasMoment): number {
	const moment1 = a.moment();
	const moment2 = b.moment();
	return moment2.isAfter(moment1) ? 1 : moment1.isAfter(moment2) ? -1 : 0;
}

export function isArray(input: any): input is [] {
    return input && Array.isArray(input);
}

export function isString (input: any): input is string {
	return typeof input === 'string';
}

export function isPromise (input: any): input is Promise<any> {
	return input && input.then;
}