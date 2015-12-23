import * as pako from 'pako';

const TO_STRING = {to: 'string'};

export function deflate(obj, encoder?: (input) => string) {
	if (!obj) {
		return null;
	}
	const json = JSON.stringify(obj);
	const deflated = pako.deflate(json, TO_STRING);
	return encoder ? encoder(deflated) : deflated;
}

export function inflate(input: string, decoder?: (input) => string) {
	if (!input) {
		return input;
	}
	const decoded = decoder ? decoder(input) : input;
	const restored = pako.inflate(decoded, TO_STRING) as string;
	return JSON.parse(restored);
}

export function escapeTags (html: string) {
	if (!html) {
		return html;
	}
	
	return html
		.split('<').join('[[[')
		.split('>').join(']]]');
}

export function unEscapeTags (html: string) {
	if (!html) {
		return html;
	}
	return html
		.split('[[[').join('<')
		.split(']]]').join('>');
}