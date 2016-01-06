import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';
import {Link as LinkComponent} from './Link';
import {Gist as GistComponent} from './Gist';
import {ParagraphWithFirstLetterSpan} from './ParagraphWithFirstLetterSpan';


const Link = React.createFactory(LinkComponent);
const Gist = React.createFactory(GistComponent);
const PP = React.createFactory(ParagraphWithFirstLetterSpan);

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
	
	pushBlock(factory: React.Factory<any>, props: any = {}, childs?: any[]) {
		props.key = this.tree.length;
		const children = props.dangerouslySetInnerHTML ? null : firstChildOrFullArray(childs || this.inline);
		const args = [props].concat(children);
		const el = factory.apply(factory, args);
		this.inline = [];
		this.tree.push(el);
	}
	
	pushToParent(factory, props: any = {}) {
		this.parent.pushBlock(factory, props, firstChildOrFullArray(this.tree));
		return this.parent;
	}
	
	pushInline(component, pop: boolean|string = true) {
		if (pop === true || this.containsInline(pop)) {
			this.inline.pop();
		}
		this.inline.push(component);
	}
	
	private containsInline(input) {
		const index = this.inline.indexOf(input); 
		if (index < 0) {
			return false;
		}
		return index === this.inline.length - 1;
	}
}

type HtmlTransfomer = (html:string) => {
	factory: React.HTMLFactory,
	props: any
}

function innerHtmlTransformer(html:string) {
	return {
		factory: R.div,
		props: {
			dangerouslySetInnerHTML: {
				__html: html	
			}
		}
	}
}

function notNull(obj) {
	return !!obj;
}


interface CreateComponentTreeOptions {
    firstLetterSpan: boolean;
}

class MarkedReactRenderer {
    private paragraphCounter = 0;
	private container = new TreeContainer();
	
	constructor(private transformers: HtmlTransfomer[] = [], private reactOptions: CreateComponentTreeOptions = {firstLetterSpan: false}) {
		this.transformers.push(innerHtmlTransformer);
	}
	
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
		const block = this.transformers.map((t) => {
			return t(html);
		}).filter(notNull)[0];
		this.container.pushBlock(block.factory, block.props);
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
        const paragraphFactory = !this.reactOptions.firstLetterSpan || this.paragraphCounter++ > 0 ? R.p : PP;
        this.container.pushBlock(paragraphFactory);
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
		this.container.pushInline(R.code(props, code), false);
	}
    br() {
		
	}
    del(text: string) {
		
	}
    link(href: string, title: string, text: string) {
		if (text !== 'undefined') {
			this.container.pushInline(Link({href: href}, text), text);
		} else {
			// if the given text is undefined, we use the last inlined element as the child of our link
			const child = this.container.inline.pop();
			this.container.pushInline(Link({href: href}, child), false);
		}
	}
    image(href: string, title: string, text: string) {
		
	}
	text(text: string) {
		this.container.pushInline(text, false);
		return text;
	}
	
	createComponentTree(html: string) {
		const parser = new marked.Parser({
			renderer: this,
			gfm: true,
			smartypants: true
		});
		const tokens = marked.lexer(html);
		patchParser(parser, this);
		parser.parse(tokens);
		return R.div({}, firstChildOrFullArray(this.container.tree));
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

export function createComponentTree(html: string, options?: CreateComponentTreeOptions): React.ReactElement<any> {
	const renderer = new MarkedReactRenderer([htmlToGistTransformer], options);
	return renderer.createComponentTree(html);
}

const GIST_SCRIPT = /script.*src=.*gist.github.com\/(([^\/]*)\/)?(([^\?]*)\.js(on)?)(\?(file=([^"]*)))?/;

function htmlToGistTransformer(html: string) {
	const matches = GIST_SCRIPT.exec(html);
	if (!matches) {
		return null;
	}
	return {
		factory: Gist as React.DOMFactory<any>,
		props: {
			user: matches[2],
			gistId: matches[4],
			file: matches[8]
		}
	};
}
