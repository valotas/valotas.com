import React from "react";
import { render } from "@testing-library/react";
import { PrismCodeBlock } from "./PrismCodeBlock.js";

describe("PrismCode", () => {
  it("should render formated the given code", () => {
    const html = render(<PrismCodeBlock language="js" code='var x = "xxx";' />)
      .container.innerHTML;
    expect(html).toContain('<code class="language-js">');
    expect(html).toContain('<span class="token keyword">var</span>');
    expect(html).toContain('<span class="token operator">=</span>');
    expect(html).toContain('<span class="token string">"xxx"</span>');
    expect(html).toContain('<span class="token punctuation">;</span>');
  });

  it("should not format anything if no language is given", () => {
    const html = render(<PrismCodeBlock code='var x = "xxx";' />).container
      .innerHTML;
    expect(html).toContain("<code>var x =");
  });
});
