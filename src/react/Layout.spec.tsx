import * as React from 'react';
import * as RDS from 'react-dom/server';
import {Layout} from './Layout';

describe('Layout', () => {	
	it('should render html',() => {
		const html = RDS.renderToString(<Layout />);
		expect(html).toBeTruthy();
	});
});
