import { MarkedContent } from "./MarkedContent.js";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("MarkedContent", () => {
  function renderMarked(raw: string) {
    return render(<MarkedContent raw={raw} />);
  }

  it("should render html", async () => {
    renderMarked("");

    const page = await screen.findByTestId("marked");

    expect(page).toBeTruthy();
  });

  it("should render h1", async () => {
    const { container } = await renderMarked("# head");

    expect(container.innerHTML).toContain("head");
    const h1 = container.querySelector("h1");
    expect(h1).toBeTruthy();
    expect(h1?.innerHTML).toEqual("head");
  });

  it("should render em test", async () => {
    const { container } = await renderMarked("# this _is_ important");

    const el = container.querySelector("em");
    expect(el).toBeTruthy();
    expect(el?.innerHTML).toEqual("is");
  });

  it("should render paragraphs with strong or emphasized text", async () => {
    const { container } = await renderMarked(
      "this a **very strong** _paragraph_!"
    );

    const strong = container.querySelector("strong");
    expect(strong?.innerHTML).toEqual("very strong");

    const em = container.querySelector("em");
    expect(em?.innerHTML).toEqual("paragraph");
  });

  it("should render more than one block elements", async () => {
    const raw = `
## header

this is a _paragraph_!
    `;
    const { container } = await renderMarked(raw);

    const h2 = container.querySelector("h2");
    expect(h2?.innerHTML).toEqual("header");

    const em = container.querySelector("em");
    expect(em?.innerHTML).toEqual("paragraph");
  });

  it("should render code spans", async () => {
    const { container } = await renderMarked("this a `a code`!");

    const code = container.querySelector("code");
    expect(code?.innerHTML).toEqual("a code");
  });

  it("should render code blocks with a class derived from the language", async () => {
    const source = ["this is a", "", "```java", "a code block", "```"].join(
      "\n"
    );
    const { container } = await renderMarked(source);

    const pre = container.querySelector("pre");
    expect(pre).toBeTruthy();
    const code = pre?.querySelector("code");
    expect(code).toBeTruthy();
    expect(code?.innerHTML).toContain("a code block");
  });

  it.skip("should render code blocks with a javasscript class instead of js", async () => {
    const source = ["this is a", "", "```js", "a code block", "```"].join("\n");
    const { container } = await renderMarked(source);
    expect(container.innerHTML).toContain('code class="language-javascript"');
  });
});
