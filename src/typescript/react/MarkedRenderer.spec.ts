import * as React from 'react';
import * as RDS from 'react-dom/server';
import * as marked from 'marked';
import {createComponentTree} from './MarkedRenderer';

describe('MarkedRenderer', () => {
	it('should render headers',() => {
		const rendered = createComponentTree('# head');
		const html = RDS.renderToStaticMarkup(rendered);
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
		const rendered = createComponentTree('this a\n\n```js\na code block\n```');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<pre><code class="lang-js">a code block</code></pre>');
	});
	
	it('should quotes with paragraphs',() => {
		const rendered = createComponentTree(`
> this is a quote paragraph
>
> this is another paragraph
>		
		`);
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<blockquote><p>this is a quote paragraph</p>');
		expect(html).toContain('<p>this is another paragraph</p></blockquote>');
	});
	
	it('should render links',() => {
		const rendered = createComponentTree('this is a [link](/to/another/page) to another page');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<a href="/to/another/page" class="">link</a>');
	});
	
	it('should pass through html as is',() => {
		const rendered = createComponentTree('this is some\n<script scr="path/to/script"></script>');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<script scr="path/to/script"></script>');
	});
	
	it('should render ordered/unordered lists', () => {
		const source = `
- item1
- item2
`;
		const rendered = createComponentTree(source);
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<ul><li>item1</li><li>item2</li></ul>');
	});
	
	it('should transform gist script to a gist component for java files',() => {
		const rendered = createComponentTree('<script src="https://gist.github.com/1240545.js?file=ServletUsingCustomResponse.java"></script>');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<pre data-gist-id="1240545" data-gist-user="valotas" data-gist-file="ServletUsingCustomResponse.java">');
	});
	
	it('should transform gist script to a gist component for js files',() => {
		const rendered = createComponentTree('<script src="https://gist.github.com/valotas/1175447.js?file=scrapy.js"></script>');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<pre data-gist-id="1175447" data-gist-user="valotas" data-gist-file="scrapy.js">');
	});
	
	it('should transform gist script to a gist component for sh files',() => {
		const rendered = createComponentTree('<script src="https://gist.github.com/valotas/1000094.js?file=tomcat.sh"></script>');
		const html = RDS.renderToStaticMarkup(rendered);
		expect(html).toContain('<pre data-gist-id="1000094" data-gist-user="valotas" data-gist-file="tomcat.sh">');
	});
});
