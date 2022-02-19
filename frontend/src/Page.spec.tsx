import { h } from "preact";
import { Page } from "./Page";
import { render, screen } from "@testing-library/preact";

describe("Page", () => {
  it("should render html", () => {
    const html = render(<Page />);
    expect(screen.findByTestId("page")).toBeTruthy();
  });
});
