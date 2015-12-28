import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';
import {Link} from './Link';

//https://github.com/christianalfoni/markdown-to-react-components/blob/master/src/index.js

const R = React.DOM;

class MarkedReactRenderer {
	private outerTree;
	private tree = [];
	private index = 0;
	private inlineTree = [];
	
	constructor () {
		
	}
	
	code(code: string, language: string) {
		this.codespan(code, language);
		this.pushBlock(R.pre);
	}
	
	blockquoteStart() {
		this.outerTree = this.tree;
		this.tree = [];
	}
	
    blockquote(quote: string) {
		const children = this.tree;
		this.tree = this.outerTree;
		this.pushBlock(R.blockquote, {}, children);
	}
	
    html(html: string) {
		console.log('html', html);	
	}
	
    heading(text: string, level: number) {
		const el = 'h' + level;
		this.pushBlock(R[el]);
	}
	pushBlock(factory, props: any = {}, children?: any[]) {
		props.key = this.index++;
		const childs = firstChildOrFullArray(children || this.inlineTree);
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
		this.pushInline(R.strong(null, text));
	}
    em(text: string) {
		this.pushInline(R.em(null, text));
	}
	pushInline(component) {
		this.inlineTree.pop();
		this.inlineTree.push(component);
	}
    codespan(code: string, lang?: string) {
		const props = lang ? {
			className: 'lang-' + lang
		} : null;
		this.pushInline(R.code(props, code));
	}
    br() {
		
	}
    del(text: string) {
		
	}
    link(href: string, title: string, text: string) {
		this.pushInline(<Link href={href} className=''>{text}</Link>);
	}
    image(href: string, title: string, text: string) {
		
	}
	text(text: string) {
		this.inlineTree.push(text);
		return text;
	}
	
	createComponentTree(html: string) {
		const parser = new marked.Parser({
			renderer: this,
			smartypants: true
		});
		const tokens = marked.lexer(html);
		patchParser(parser, this);
		parser.parse(tokens);
		return <div>{firstChildOrFullArray(this.tree)}</div>;
	}
}

function patchParser(parser, renderer: MarkedReactRenderer) {
	const tok = parser.tok;
	parser.tok = function () {
		if (this.token.type === 'blockquote_start') {
			renderer.blockquoteStart();
		}
		tok.call(parser, arguments);
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
