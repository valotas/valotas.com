import * as React from 'react';

export class MarkedRenderer {
	heading(text: string, level?: number) {
		return <h1>{text}</h1>;
	}
	paragraph(text: string) {
		return <p>{text}</p>;
	}
	
	render(tokens: any[]): React.ReactElement<any> {
		return <div>{tokens.map(this.renderToken.bind(this))}</div>;
	}
	renderToken(token) {
		return this[token.type](token.text);
	} 
}