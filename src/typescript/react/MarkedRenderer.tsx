import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';
import {Link} from './Link';

//https://github.com/christianalfoni/markdown-to-react-components/blob/master/src/index.js
const R = React.DOM;

class TreeContainer {
	tree = [];
	inline = [];
	
	constructor(private parent?: TreeContainer) {
	
	}
	
	childContainer() {
		return new TreeContainer(this);
	}
	
	pushBlock(factory, props: any = {}, childs?: any[]) {
		props.key = this.tree.length;
		const el = factory(props, firstChildOrFullArray(childs || this.inline));
		this.inline = [];
		this.tree.push(el);
	}
	
	pushToParent(factory, props: any = {}) {
		this.parent.pushBlock(factory, props, firstChildOrFullArray(this.tree));
		return this.parent;
	}
	
	pushInline(component) {
		this.inline.pop();
		this.inline.push(component);
	}
}

class MarkedReactRenderer {
	private container = new TreeContainer();
	
	nextToken(token: {type:string}) {
		if (token.type === 'blockquote_start' || 
			token.type === 'list_start') {
			this.container = this.container.childContainer();
		}
	}
	
	code(code: string, language: string) {
		this.codespan(code, language);
		this.container.pushBlock(R.pre);
	}
	
    blockquote(quote: string) {
		this.container = this.container.pushToParent(R.blockquote, {});
	}
	
    html(html: string) {
		//console.log('html', html);	
	}
	
    heading(text: string, level: number) {
		this.container.pushBlock(R['h' + level]);
	}
    hr() {
		this.container.pushBlock(R.hr);
	}
    list(body: string, ordered: boolean) {
		this.container = this.container.pushToParent(R.ul);
	}
    listitem(text: string) {
		this.container.pushBlock(R.li);
	}
    paragraph(text: string) {
		this.container.pushBlock(R.p);
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
		this.container.pushInline(R.strong(null, text));
	}
    em(text: string) {
		this.container.pushInline(R.em(null, text));
	}
    codespan(code: string, lang?: string) {
		const props = lang ? {
			className: 'lang-' + lang
		} : null;
		this.container.pushInline(R.code(props, code));
	}
    br() {
		
	}
    del(text: string) {
		
	}
    link(href: string, title: string, text: string) {
		this.container.pushInline(<Link href={href} className=''>{text}</Link>);
	}
    image(href: string, title: string, text: string) {
		
	}
	text(text: string) {
		this.container.inline.push(text);
		return text;
	}
	
	createComponentTree(html: string) {
		const parser = new marked.Parser({
			renderer: this,
			smartypants: true
		});
		const tokens = marked.lexer(html);
		//console.log(tokens);
		patchParser(parser, this);
		parser.parse(tokens);
		return <div>{firstChildOrFullArray(this.container.tree)}</div>;
	}
}

function patchParser(parser, renderer: MarkedReactRenderer) {
	const tok = parser.tok;
	parser.tok = function () {
		renderer.nextToken(this.token);
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
