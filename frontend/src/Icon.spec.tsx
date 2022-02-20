import { render } from "@testing-library/react";
import React from "react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("should render an i with the given name as classname", () => {
    const { container } = render(<Icon name="name" />);
    expect(container.innerHTML).toContain("<i");
    expect(container.innerHTML).toContain('class="fa name fa-1x"');
  });
});
