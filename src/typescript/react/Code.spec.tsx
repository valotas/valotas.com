import { h } from 'preact';
import * as render from 'preact-render-to-string';
import { Code } from './Code';

describe('Code', () => {
  it('should render given code wrapped with a .codeblock pre code', () => {
    const html = render(<Code>var x = "xxx"</Code>);
    expect(html).toContain('<div class="codeblock"><pre><code>var x =');
  });

  it('should not render <code/> twice if given as child', () => {
    const html = render(<Code><code>var x = "xxx"</code></Code>);
    expect(html).toContain('<div class="codeblock"><pre><code>var x =');
  });

  it('should make use of first child as title when 2 given', () => {
    const html = render(
      <Code>
        <h1>The title</h1>
        <code>var x = "xxx"</code>
      </Code>
    );

    expect(html).toContain([
      '<div class="codeblock">',
        '<div class="title"><h1>The title</h1></div>',
        '<pre><code>var x ='
    ].join(''));
  });
});
