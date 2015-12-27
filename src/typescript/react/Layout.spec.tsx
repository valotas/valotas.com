import * as React from 'react';
import * as RDS from 'react-dom/server';
import {Layout} from './Layout';
import {Article} from '../content/Article';
import {MetaFile} from '../content/MetaFile';

describe('Layout', () => {	
	it('should render html',() => {
		const html = RDS.renderToString(<Layout />);
		expect(html).toBeTruthy();
	});
	
	it('should render the Index layout if a list of articles is given', () => {
		const article1 = new MetaFile({
                        title: 'first article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        path: 'article1'
                });
                const article2 = new MetaFile({
                        title: 'second article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        path: 'article2'
                });
		const html = RDS.renderToString(<Layout meta={[article1, article2]}/>);
		expect(html).toContain('first article');
		expect(html).toContain('second article');
	});
        
        it('should render a clear fix for each 3 articles', () => {
		const article1 = new MetaFile({
                        title: 'first article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        path: 'article1'
                });
                const article2 = new MetaFile({
                        title: 'second article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        template: null,
                        path: 'article2',
                        description: null
                });
                const article3 = new MetaFile({
                        title: 'third article',
                        date: '2015-11-11',
                        published: true,
                        raw: 'some md content',
                        path: 'article3'
                });
		const html = RDS.renderToString(<Layout meta={[article1, article2, article3]}/>);
		expect(html).toContain('class="clearfix"');
	});
});
