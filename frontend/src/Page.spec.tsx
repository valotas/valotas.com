import { Page } from "./Page";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Page", () => {
  it("should render html", async () => {
    render(<Page />);

    const page = await screen.findByTestId("page");

    expect(page).toBeTruthy();
  });

  it("should render a Footer", async () => {
    render(<Page />);

    const footer = await screen.findByTestId("footer");

    expect(footer).toBeTruthy();
  });
});
