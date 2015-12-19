import * as React from 'react';
import * as RDS from 'react-dom/server';
import {Layout} from './Layout';
import {Article} from '../content/Article';

describe('Layout', () => {	
	it('should render html',() => {
		const html = RDS.renderToString(<Layout />);
		expect(html).toBeTruthy();
	});
	
	it('should render the Index layout if a list of articles is given', () => {
		const article1 = new Article({
                        title: 'first article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article1'
                });
                const article2 = new Article({
                        title: 'second article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article2'
                });
		const html = RDS.renderToString(<Layout articles={[article1, article2]}/>);
		expect(html).toContain('first article');
		expect(html).toContain('second article');
	});
});
