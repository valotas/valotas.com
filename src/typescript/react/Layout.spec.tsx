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
		const article1 = {
                        title: 'first article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article1',
                        description: null
                };
                const article2 = {
                        title: 'second article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article2',
                        description: null
                };
		const html = RDS.renderToString(<Layout meta={[article1, article2]}/>);
		expect(html).toContain('first article');
		expect(html).toContain('second article');
	});
        
        it('should render a clear fix for each 3 articles', () => {
		const article1 = {
                        title: 'first article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article1',
                        description: null
                };
                const article2 = {
                        title: 'second article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article2',
                        description: null
                };
                const article3 = {
                        title: 'third article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article3',
                        description: null
                };
		const html = RDS.renderToString(<Layout meta={[article1, article2, article3]}/>);
		expect(html).toContain('class="clearfix"');
	});
});
