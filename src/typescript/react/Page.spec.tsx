import { h } from 'preact';
import * as render from 'preact-render-to-string';
import { PackageJson } from '../PackageJson.factory';
import { Page } from './Page';
import { MetaFile } from '../content/MetaFile';

describe('Page', () => {
  const pkg: PackageJson = {
    name: 'the name',
    version: '666'
  };

  it('should render html', () => {
    const html = render(<Page pkg={pkg} />);
    expect(html).toBeTruthy();
  });

  it('should render html without tsx', () => {
    const html = render(h(Page, { pkg }));
    expect(html).toBeTruthy();
  });

  it('should render the Index layout if a list of articles is given', () => {
    const article1 = new MetaFile({
      title: 'first article',
      date: '2015-11-11',
      published: true,
      raw: 'some md content',
      type: 'article',
      path: 'article1'
    });
    const article2 = new MetaFile({
      title: 'second article',
      date: '2015-11-11',
      published: true,
      raw: 'some md content',
      path: 'article2',
      type: 'article'
    });
    const html = render(<Page meta={[article1, article2]} pkg={pkg} />);
    expect(html).toContain('first article');
    expect(html).toContain('second article');
  });

  it('should add the class third on each 3rd article card', () => {
    const article1 = new MetaFile({
      title: 'first article',
      type: 'article',
      date: '2015-11-11',
      published: true,
      raw: 'some md content',
      path: 'article1'
    });
    const article2 = new MetaFile({
      title: 'second article',
      type: 'article',
      date: '2015-11-11',
      published: true,
      raw: 'some md content',
      path: 'article2',
      description: null
    });
    const article3 = new MetaFile({
      title: 'third article',
      type: 'article',
      date: '2015-11-11',
      published: true,
      raw: 'some md content',
      path: 'article3'
    });
    const html = render(<Page meta={[article1, article2, article3]} pkg={pkg} />);
    expect(html).toContain('class="article-card"');
  });
});
