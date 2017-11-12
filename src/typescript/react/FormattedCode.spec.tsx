import { h } from 'preact';
import * as render from 'preact-render-to-string';
import { FormattedCode } from './FormattedCode';

describe('FormattedCode', () => {
  it('should render formated the given code', () => {
    const html = render(
      <FormattedCode language="js" code="var x = &quot;xxx&quot;;" />
    );
    expect(html).toContain('<code class="language-js">');
    expect(html).toContain('<span class="token keyword">var</span>');
    expect(html).toContain('<span class="token operator">=</span>');
    expect(html).toContain('<span class="token string">"xxx"</span>');
    expect(html).toContain('<span class="token punctuation">;</span>');
  });

  it('should render formated the given children', () => {
    const code = 'var x = "xxx";';
    const html = render(<FormattedCode language="js">{code}</FormattedCode>);
    const html2 = render(<FormattedCode language="js" code={code} />);

    expect(html).toEqual(html2);
  });

  it('should not format anything if no language is given', () => {
    const html = render(<FormattedCode code="var x = &quot;xxx&quot;;" />);
    expect(html).toContain('<code>var x =');
  });
});
