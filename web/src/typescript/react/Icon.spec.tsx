import { h } from "preact";
import { render } from "../renderToString";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("should render an i with the given name as classname", () => {
    const html = render(<Icon name="name" />);
    expect(html).toContain("<i");
    expect(html).toContain('class="fa name fa-1x"');
  });

  it("should render without jsx", () => {
    const html = render(h(Icon, { name: "name" }));
    expect(html).toContain("<i");
    expect(html).toContain('class="fa name fa-1x"');
  });
});
