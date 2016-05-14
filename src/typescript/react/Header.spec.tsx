import * as React from 'react';
import * as RDS from 'react-dom/server';
import {Header} from './Header';

describe('Header', () => {
	it('should render html with the given title and subtitle', () => {
		const html = RDS.renderToString(<Header title='The title' subtitle='The subtitle' />);
		expect(html).toContain('The title</h1>');
		expect(html).toContain('The subtitle</span>');
	});
});
