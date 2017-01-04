import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../../exceptions';
import {ParagraphWithFirstLetterSpan} from '../ParagraphWithFirstLetterSpan';

const EMPTY_STRING = '';

const PP = React.createFactory(ParagraphWithFirstLetterSpan);

// https://github.com/christianalfoni/markdown-to-react-components/blob/master/src/index.js
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

function innerHtmlTransformer(html: string) {
	return {
		factory: R.div,
		props: {
			dangerouslySetInnerHTML: {
				__html: html
			}
		}
	};
}

function notNull(obj) {
	return !!obj;
}

type HtmlTransfomer = (html: string) => {
	factory: React.HTMLFactory<HTMLElement>,
	props: any
};

interface MarkRenderOptions {
	html: HtmlTransfomer[];
	pre: React.Factory<any>;
	link: React.Factory<any>;
    firstLetterSpan: boolean;
}

export class MarkedReactRenderer implements MarkedRenderer {
	private paragraphCounter = 0;
	private container = new TreeContainer();

	constructor(private renderOptions: MarkRenderOptions) {
		renderOptions.html.push(innerHtmlTransformer);
	}

	nextToken(token: {type: string}) {
		if (token.type === 'blockquote_start' ||
			token.type === 'list_start') {
			this.container = this.container.childContainer();
		}
	}

	code(code: string, language: string) {
		this.codespan(code, language);
		this.container.pushBlock(this.renderOptions.pre);
		return EMPTY_STRING;
	}

    blockquote(quote: string) {
		this.container = this.container.pushToParent(R.blockquote, {});
		return EMPTY_STRING;
	}

    html(html: string) {
		const block = this.renderOptions.html.map((t) => {
			return t(html);
		}).filter(notNull)[0];
		this.container.pushBlock(block.factory, block.props);
		return EMPTY_STRING;
	}

    heading(text: string, level: number) {
		this.container.pushBlock(R['h' + level]);
		return EMPTY_STRING;
	}
    hr() {
		this.container.pushBlock(R.hr);
		return EMPTY_STRING;
	}
    list(body: string, ordered: boolean) {
		this.container = this.container.pushToParent(R.ul);
		return EMPTY_STRING;
	}
    listitem(text: string) {
		this.container.pushBlock(R.li);
		return EMPTY_STRING;
	}
    paragraph(text: string) {
		this.paragraphCounter++;
		const shouldMarkFirstLetter = this.renderOptions.firstLetterSpan && this.paragraphCounter === 1;
        this.container.pushBlock(shouldMarkFirstLetter ? PP : R.p);
		return EMPTY_STRING;
	}
    table(header: string, body: string) {
		// not implemented yet
		return EMPTY_STRING;
	}
    tablerow(content: string) {
		// not implemented yet
		return EMPTY_STRING;
	}
    tablecell(content: string, flags: {
        header: boolean,
        align: string
    }) {
		// not implemented yet
		return EMPTY_STRING;
	}
    strong(text: string) {
		this.container.pushInline(R.strong(null, text));
		return EMPTY_STRING;
	}
    em(text: string) {
		this.container.pushInline(R.em(null, text));
		return EMPTY_STRING;
	}
    codespan(code: string, lang?: string) {
		const props = lang ? {
			className: 'lang-' + lang
		} : null;
		this.container.pushInline(R.code(props, unescapeText(code)), false);
		return EMPTY_STRING;
	}
    br() {
		return EMPTY_STRING;
	}
    del(text: string) {
		return EMPTY_STRING;
	}
    link(href: string, title: string, text: string = EMPTY_STRING) {
		if (text !== EMPTY_STRING) {
			const link = this.renderOptions.link({href: href}, text);
			this.container.pushInline(link, text);
		} else {
			// if the given text is undefined, we use the last inlined element as the child of our link
			const child = this.container.inline.pop();
			const link = this.renderOptions.link({href: href}, child);
			this.container.pushInline(link, false);
		}
		return EMPTY_STRING;
	}
    image(href: string, title: string, text: string) {
		return EMPTY_STRING;
	}
	text(text: string) {
		this.container.pushInline(unescapeText(text), false);
		return text;
	}

	createComponentTree(html: string) {
		const parser = new marked.Parser({
			renderer: this,
			gfm: true,
			smartypants: true
		} as MarkedOptions);
		const tokens = marked.lexer(html);
		patchParser(parser, this);
		parser.parse(tokens);
		return R.div({}, firstChildOrFullArray(this.container.tree));
	}
}

function unescapeText(input: string) {
    return input.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
}

function patchParser(parser, renderer: MarkedReactRenderer) {
	const tok = parser.tok;
	parser.tok = function () {
		renderer.nextToken(this.token);
		tok.call(parser, arguments);
	};
}

function firstChildOrFullArray(input: any[]) {
	if (input && input.length === 1) {
		return input[0];
	}
	return input;
}

