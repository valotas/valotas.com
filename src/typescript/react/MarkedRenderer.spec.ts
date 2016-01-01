import * as React from 'react';
import * as RDS from 'react-dom/server';
import * as marked from 'marked';
import {createComponentTree} from './MarkedRenderer';

function renderToStaticMarkup(source) {
	const tree = createComponentTree(source);
	return RDS.renderToStaticMarkup(tree);
}

describe('MarkedRenderer', () => {
	it('should render headers',() => {
		const html = renderToStaticMarkup('# head');
		expect(html).toContain('<h1>head</h1>');
	});
	
	it('should render headers with emphasized text',() => {
		const rendered = createComponentTree('# this _is_ important');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<em>is</em>');
	});
	
	it('should render paragraphs with strong or emphasized text',() => {
		const rendered = createComponentTree('this a **very strong** _paragraph_!');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<strong>very strong</strong>');
		expect(html).toContain('<em>paragraph</em>');
	});
	
	it('should render more than one block elements',() => {
		const rendered = createComponentTree('## header \n\nthis a _paragraph_!');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<h2>header</h2>');
		expect(html).toContain('<em>paragraph</em>');
	});
	
	it('should render code spans',() => {
		const rendered = createComponentTree('this a `a code`!');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<code>a code</code>');
	});
	
	it('should render code blocks with a class derived from the language',() => {
		const source = 'this a\n\n```js\na code block\n```';
		const expected = marked(source).replace(/\n/g, '');
		const html = renderToStaticMarkup(source);
		expect(html).toContain(expected);
	});
	
	it('should quotes with paragraphs',() => {
		const source = `
> this is a quote paragraph
>
> this is another paragraph
>		
		`;
		const expected = marked(source).replace(/\n/g, '');
		const html = renderToStaticMarkup(source);
		expect(html).toContain(expected);
		//expect(html).toContain('<p>this is another paragraph</p></blockquote>');
	});
	
	it('should render links',() => {
		const html = renderToStaticMarkup('this is a [link](/to/another/page) to another page');
		expect(html).toContain('<a href="/to/another/page">link</a>');
	});
	
	it('should pass through html as is',() => {
		const html = renderToStaticMarkup('this is some\n<script scr="path/to/script"></script>');
		expect(html).toContain('<script scr="path/to/script"></script>');
	});
	
	it('should render ordered/unordered lists', () => {
		const source = `
- item1
- item2
`;
		const expected = marked(source).replace(/\n/g, '');
		const html = renderToStaticMarkup(source);
		expect(html).toContain(expected);
	});
	
	it('should transform gist script to a gist component for java files',() => {
		const html = renderToStaticMarkup('<script src="https://gist.github.com/1240545.js?file=ServletUsingCustomResponse.java"></script>');
		expect(html).toContain('<pre class="panel-body" data-gist-id="1240545" data-gist-user="valotas" data-gist-file="ServletUsingCustomResponse.java">');
	});
	
	it('should transform gist script to a gist component for js files',() => {
		const html = renderToStaticMarkup('<script src="https://gist.github.com/valotas/1175447.js?file=scrapy.js"></script>');
		expect(html).toContain('<pre class="panel-body" data-gist-id="1175447" data-gist-user="valotas" data-gist-file="scrapy.js">');
	});
	
	it('should transform gist script to a gist component for sh files',() => {
		const html = renderToStaticMarkup('<script src="https://gist.github.com/valotas/1000094.js?file=tomcat.sh"></script>');
		expect(html).toContain('<pre class="panel-body" data-gist-id="1000094" data-gist-user="valotas" data-gist-file="tomcat.sh">');
	});
	
	it('should render paragraphs with mix span and code blocks',() => {
		const source = 'This is a paragraph  with `code block`.';
		const expected = marked(source).trim();
		const html = renderToStaticMarkup(source);
		expect(html).toContain(expected);
	});
});
