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

interface CreateScriptOptions {
	protocol?: string;
	id?: string;
}

export function createScript(url: string, options?: CreateScriptOptions): HTMLScriptElement {
	const wf = document.createElement('script');
	const proto = options && options.protocol ? options.protocol : 'https:' == document.location.protocol ? 'https' : 'http';
    wf.src = proto + ':' + url;
    wf.type = 'text/javascript';
    wf.async = true;
	if (options && options.id) {
		wf.id = options.id
	}
	return wf;
}