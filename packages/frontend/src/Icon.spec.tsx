import { render } from "./testing.js";
import { Icon } from "./Icon.js";

describe("Icon", () => {
  it("should render an svg", () => {
    const { container } = render(<Icon name="ig" />);
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
