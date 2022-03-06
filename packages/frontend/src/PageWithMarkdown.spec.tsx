import { render, screen } from "@testing-library/react";
import React from "react";
import { PageWithMarkdown } from "./PageWithMarkdown";

describe("PageWithMarkdown", () => {
  it("should render html", async () => {
    render(<PageWithMarkdown />);

    const page = await screen.findByTestId("page");

    expect(page).toBeTruthy();
  });

  it("should render a Footer", async () => {
    render(<PageWithMarkdown />);

    const footer = await screen.findByTestId("footer");

    expect(footer).toBeTruthy();
  });

  it("should render a Header", async () => {
    render(<PageWithMarkdown />);

    const header = await screen.findByTestId("header");

    expect(header).toBeTruthy();
  });
});
