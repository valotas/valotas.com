import { render } from "@testing-library/react";
import React from "react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("should render an svg", () => {
    const { container } = render(<Icon name="ig" />);
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
