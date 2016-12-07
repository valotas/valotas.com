import * as React from 'react';
import * as RDS from 'react-dom/server';
import { Layout } from './Layout';
import { MetaFile } from '../content/MetaFile';

describe('Layout', () => {
  const pkg: PackageJson = {
    name: 'the name',
    version: '666'
  };
  it('should render html', () => {
    const html = RDS.renderToString(<Layout pkg={pkg} />);
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
    const html = RDS.renderToString(<Layout meta={[article1, article2]} pkg={pkg} />);
    expect(html).toContain('first article');
    expect(html).toContain('second article');
  });

  it('should add the class third on each 3rd article card', () => {
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
    const html = RDS.renderToString(<Layout meta={[article1, article2, article3]} pkg={pkg} />);
    expect(html).toContain('class="article-card"');
  });
});
