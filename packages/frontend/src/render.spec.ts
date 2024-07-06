import { jest } from "@jest/globals";
import { render } from "./render.js";

describe("render", () => {
  test("returns an html string", async () => {
    const html = await render({ props: { bodyMarkdown: "the body" } });
    expect(html.body).toContain(">the body</p>");
  });

  test("decodes the given payload", async () => {
    const props = { bodyMarkdown: "the body" };
    const payload = JSON.stringify(props);
    const html = await render({ payload });
    expect(html.body).toContain(">the body</p>");
  });

  test("waits the fetch promises to be resolved before returning", async () => {
    const fetch: any = jest
      .fn()
      .mockReturnValue(Promise.resolve("resolved fetch content"));
    const markdown = `
This is content with a gist script that should cause a fetch request
as it has the following gist script:

<script src="https://gist.github.com/valotas/c71a7aa41de5d03197a2.js?file=specs"></script>

that is all!
    `;

    await render({
      fetchContent: fetch,
      props: {
        bodyMarkdown: markdown,
      },
    });

    expect(fetch).toHaveBeenCalled();
  });
});
