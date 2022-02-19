import { h } from "preact";
import { Page } from "./Page.js";
import { render, screen } from "@testing-library/preact";

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
