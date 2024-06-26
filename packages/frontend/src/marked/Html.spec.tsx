import { render } from "@testing-library/react";
import React from "react";
import { Html } from "./Html";

describe("Html", () => {
  it("should render html", async () => {
    const { container } = render(
      <Html raw="aa" pre={false} text="" type="html" children={[]} />,
    );

    expect(container.innerHTML).toContain(">aa</div>");
  });

  it("strips scripts out of the content", async () => {
    const contentWithScript = `
    Some content

    <script>hi</script>

    more content
    `;
    const { container } = render(
      <Html
        raw={contentWithScript}
        pre={false}
        text=""
        type="html"
        children={[]}
      />,
    );

    expect(container.innerHTML).toContain(`Some content`);
    expect(container.innerHTML).toContain(`more content`);
    expect(container.innerHTML).not.toContain(`<script>`);
    expect(container.innerHTML).not.toContain(`hi`);
  });

  it("strips scripts out of the content even when not properly closed", async () => {
    const contentWithScript = `
    Some content

    <script>hi<script>

    more content
    `;
    const { container } = render(
      <Html
        raw={contentWithScript}
        pre={false}
        text=""
        type="html"
        children={[]}
      />,
    );

    expect(container.innerHTML).not.toContain(`<script>`);
  });
});
