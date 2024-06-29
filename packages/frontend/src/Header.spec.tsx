import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./Header.js";

describe("Header", () => {
  it("should render html with h1 with the given title", () => {
    const { container } = render(<Header title="The title" />);

    const h1 = container.querySelector("h1");

    expect(h1).toBeTruthy();
  });
});
