import * as React from 'react';
import * as RDS from 'react-dom/server';
import {Header} from './Header';

describe('Header', () => {
	it('should render html with the given title and subtitle', () => {
		const html = RDS.renderToString(<Header title='The title' subtitle='The subtitle' />)
			.replace(/<\![^>]+>/g, '')
			.replace(/\sdata-reactid="[0-9]+"/g, '');
		expect(html).toContain('<h1 class="signature-row">The title</h1>');
		expect(html).toContain('<h4 class="signature-row">The subtitle');
	});
});
