import * as React from 'react';
import * as RDS from 'react-dom/server';
import * as marked from 'marked';
import {MarkedRenderer} from './MarkedRenderer';

describe('MarkedRenderer', () => {
	let renderer;
	
	beforeEach(() => {
			renderer = new MarkedRenderer();
	});
	
	it('should render html',() => {
		const parsed = marked.lexer('# head\n\nparagraph');
		const rendered = renderer.render(parsed);
		const html = RDS.renderToString(rendered);
		expect(html).toContain('head</h1>');
		expect(html).toContain('paragraph</p>');
	});
	
});
