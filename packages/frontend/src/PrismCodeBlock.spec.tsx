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
    const { container } = render(<PrismCodeBlock code='var x = "xxx";' />);
    const code = container.querySelector("code");
    expect(code?.innerHTML).toContain(`var x = "xxx"`);
  });
});
