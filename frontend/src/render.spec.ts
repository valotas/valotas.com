import { render } from "./render.js";

describe("render", () => {
  test("returns an html string", async () => {
    const html = await render({ bodyMarkdown: "the body" });
    expect(html).toContain("<p>the body</p>");
  });

  test("waits the fetch promises to be resolved before returning", async () => {
    const fetch = jest
      .fn()
      .mockReturnValue(Promise.resolve("resolved fetch content"));
    const markdown = `
This is content with a gist script that should cause a fetch request
as it has the following gist script:

<script src="https://gist.github.com/valotas/c71a7aa41de5d03197a2.js?file=specs.js"></script>

that is all!
    `;

    await render({
      bodyMarkdown: markdown,
      fetchContent: fetch,
    });

    expect(fetch).toHaveBeenCalled();
  });
});
