import { render, screen, waitFor } from "@testing-library/react";
import { MarkedContent } from "./MarkedContent.js";

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
      "this a **very strong** _paragraph_!",
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
      "\n",
    );
    const { container } = await renderMarked(source);

    const pre = container.querySelector("pre");
    expect(pre).toBeTruthy();
    const code = pre?.querySelector("code");
    expect(code).toBeTruthy();
    expect(code?.innerHTML).toContain("a code block");
  });

  it("should render code blocks with a javasscript class instead of js", async () => {
    const source = ["this is a", "", "```js", "a code block", "```"].join("\n");
    const { container } = await renderMarked(source);
    const code = container.querySelector("code");
    expect(code).toBeTruthy();
    expect(code?.innerHTML).toBe("a code block");
  });

  it("should handle special characters in code blocks", () => {
    const source = "this is `some > code`";
    const { container } = renderMarked(source);
    expect(container.innerHTML).toContain("some &gt; code");
  });

  it("should render code blocks with a javasscript class instead of js", async () => {
    const source = ["this is a", "", "```js", "a code block", "```"].join("\n");
    const { container } = await renderMarked(source);
    expect(container.innerHTML).toContain('code class="language-javascript"');
  });

  it("should quotes with paragraphs", async () => {
    const source = `
> this is a quote paragraph
>
> this is another paragraph
>
    `;
    const { container } = await renderMarked(source);
    const quote = container.querySelector("blockquote");
    expect(quote).toBeTruthy();

    const paragraphs = quote?.querySelectorAll("p") || [];
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].innerHTML).toBe("this is a quote paragraph");
    expect(paragraphs[1].innerHTML).toBe("this is another paragraph");
  });

  it("should render links", async () => {
    const { container } = await renderMarked(
      "this is a [link](/to/another/page) to another page",
    );
    const link = container.querySelector("a");

    expect(link?.href).toContain("/to/another/page");
    expect(link?.innerHTML).toBe("link");
  });

  it("should not render unrecognised scripts", () => {
    const { container } = renderMarked(
      'this is some\n<script scr="path/to/script"></script>',
    );
    expect(container.innerHTML).not.toContain("script");
  });

  describe("gists", () => {
    it("should replace gist scripts with a component", async () => {
      const { container } = renderMarked(
        '<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=expectObservable"></script>',
      );

      await waitFor(() => {
        expect(container.innerHTML).toContain(
          "https://gist.github.com/valotas/09f8fabc1a1db4b108b3",
        );
      });
    });

    [
      { file: "some.java", language: "java" },
      { file: "some.js", language: "javascript" },
      { file: "some", language: "plain" },
    ].forEach(({ file, language }) => {
      it(`renders 'language-${language}' for file '${file}'`, async () => {
        const { container } = renderMarked(
          `<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=${file}"></script>`,
        );

        await waitFor(() => {
          expect(container.innerHTML).toContain(`class="language-${language}"`);
        });
      });
    });
  });

  it("should render paragraphs with mix span and code blocks", () => {
    const source = "This is a paragraph  with `code block`.";

    const { container } = renderMarked(source);
    const paragraph = container.querySelector("p");
    const code = container.querySelector("code");

    expect(paragraph).toBeTruthy();
    expect(code).toBeTruthy();
    expect(code?.parentElement).toBe(paragraph);
  });

  it("should transform links to anchors", () => {
    const source = "Go to http://google.com/";

    const { container } = renderMarked(source);
    const anchor = container.querySelector("a");

    expect(anchor?.href).toContain("http://google.com/");
    expect(anchor?.innerHTML).toBe("http://google.com/");
  });

  it("should links with inline code", () => {
    const source = "[`DAO`](http://link.to/dao)s";
    const { container } = renderMarked(source);
    const anchor = container.querySelector("a");
    expect(anchor).toBeTruthy();
    const code = container.querySelector("code");
    expect(code).toBeTruthy();
    expect(code?.parentNode).toBe(anchor);
  });

  it("should create pre>code for code blocks", () => {
    const source = ["```", "function xyz() {};", "```"].join("\n");
    const { container } = renderMarked(source);

    const pre = container.querySelector("pre");
    expect(pre).toBeTruthy();
    const code = container.querySelector("code");
    expect(code?.parentElement).toBe(pre);
  });

  it("should handle greater/lower than charachters right", () => {
    const source = `Asume this ><&><`;
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("this &gt;&lt;&amp;&gt;&lt;");
  });

  it("renders styled <ol/>", () => {
    const source = `Handles uls:
1. item 1
1. item 2    
    `;
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<ol");
    expect(html).toContain("list-decimal");
  });

  it("renders styled <ul/>", () => {
    const source = `Handles uls:
- item 1
- item 2    
    `;
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<ul");
    expect(html).toContain("list-disc");
  });

  it("renders styled inline codes", () => {
    const source = "Handles `inline code`";
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<code");
    expect(html).toContain("bg-gray-200 rounded px-1");
  });

  it("renders styled <h1/>", () => {
    const source = "# Header";
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<h1");
    expect(html).toContain(
      "text-2xl font-extrabold text-black leading-tight mt-6",
    );
  });

  it("renders styled <h2/>", () => {
    const source = "## Header";
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<h2");
    expect(html).toContain(
      "text-2xl font-extrabold text-black leading-tight mt-6",
    );
  });

  it("renders styled <h3/>", () => {
    const source = "### Header";
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<h3");
    expect(html).toContain(`font-extrabold text-black leading-tight mt-4`);
  });

  it("renders styled <h4/>", () => {
    const source = "#### Header";
    const html = renderMarked(source).container.innerHTML;
    expect(html).toContain("<h4");
    expect(html).toContain(`text-black leading-tight mt-4`);
  });

  it("renders styled <a/>", () => {
    const source = "[a link](http://link.to)";
    const { container } = renderMarked(source);
    const a = container.querySelector("a");

    expect(a).toBeTruthy();
    expect(a?.className).toContain(
      "border-b border-gray-300 hover:border-gray-500 leading-tight inline-block",
    );
  });
});
