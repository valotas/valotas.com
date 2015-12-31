import * as pako from 'pako';
import * as base64 from 'base64-js';
import * as moment from 'moment';

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

interface HasMoment {
	moment(): moment.Moment
}

export function compareMoments(a: HasMoment, b: HasMoment): number {
	const moment1 = a.moment();
	const moment2 = b.moment();
	return moment2.isAfter(moment1) ? 1 : moment1.isAfter(moment2) ? -1 : 0;
}

export function isArray(input: any): input is [] {
    return input && input.length;
}

export function isString(input:any): input is string {
	return typeof input === 'string';
}

export function isPromise(input:any): input is Promise<any> {
	return input && input.then;
}