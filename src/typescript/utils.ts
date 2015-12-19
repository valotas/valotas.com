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