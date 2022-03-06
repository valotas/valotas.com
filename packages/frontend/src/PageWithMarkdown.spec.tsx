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

  it("should render a date at the header when given", async () => {
    render(<PageWithMarkdown date="2010-12-22" />);

    const date = await screen.findByTestId("date");

    expect(date.innerHTML).toContain("December 22nd, 2010");
  });
});
