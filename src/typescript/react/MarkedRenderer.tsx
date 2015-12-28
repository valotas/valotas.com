import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';

//https://github.com/christianalfoni/markdown-to-react-components/blob/master/src/index.js

const R = React.DOM;

class MarkedReactRenderer {
	private tree = [];
	private index = 0;
	private inlineTree = [];
	
	constructor () {
		
	}
	
	code(code: string, language: string) {
		this.codespan(code, language);
		this.pushBlock(R.pre);
	}
	
    blockquote(quote: string) {
		console.log('blockquote', quote);
	}
	
    html(html: string) {
		
	}
	
    heading(text: string, level: number) {
		const el = 'h' + level;
		this.pushBlock(R[el]);
	}
	pushBlock(factory, props = {key: '0'}) {
		this.index = this.index + 1;
		props.key = this.index + '';
		const childs = firstChildOrFullArray(this.inlineTree);
		const el = factory(props, childs);
		this.inlineTree = [];
		this.tree.push(el);
	}
    hr() {
		this.pushBlock(R.hr);
	}
    list(body: string, ordered: boolean) {
		
	}
    listitem(text: string) {
		
	}
    paragraph(text: string) {
		this.pushBlock(R.p);
	}
    table(header: string, body: string) {
		//not implemented yet
	}
    tablerow(content: string) {
		//not implemented yet
	}
    tablecell(content: string, flags: {
        header: boolean,
        align: string
    }) {
		//not implemented yet
	}
    strong(text: string) {
		this.pushInline(R.strong, text);
	}
    em(text: string) {
		this.pushInline(R.em, text);
	}
	pushInline(el, text, props = null) {
		this.inlineTree.pop();
		this.inlineTree.push(el(props, text));
	}
    codespan(code: string, lang?: string) {
		const props = lang ? {
			className: 'lang-' + lang
		} : null;
		this.pushInline(R.code, code, props);
	}
    br() {
		
	}
    del(text: string) {
		
	}
    link(href: string, title: string, text: string) {
		
	}
    image(href: string, title: string, text: string) {
		
	}
	text(text: string) {
		this.inlineTree.push(text);
		return text;
	}
	
	createComponentTree(html: string) {
		//const tokens = marked.lexer(html);
		//const parser = marked.parser(tokens);
		//console.log(parser);
		marked(html, {
			renderer: this,
			smartypants: true
		});
		return <div>{firstChildOrFullArray(this.tree)}</div>;
	}
}

function firstChildOrFullArray(input: any[]) {
	if (input && input.length === 1) {
		return input[0];
	}
	return input;
}

export function createComponentTree(html: string): React.ReactElement<any> {
	const renderer = new MarkedReactRenderer();
	return renderer.createComponentTree(html);
}
