export function escapeTags (html: string) {
	return html
		.split('<').join('[[[')
		.split('>').join(']]]');
}

export function unEscapeTags (html: string) {
	return html
		.split('[[[').join('<')
		.split(']]]').join('>');
}