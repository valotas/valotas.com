import { render } from "./render";

describe("render", () => {
  test("returns an html string", async () => {
    const html = await render({ props: { bodyMarkdown: "the body" } });
    expect(html.body).toContain(">the body</p>");
  });

  test("decodes the given props", async () => {
    const props = { bodyMarkdown: "the body" };
    const payload = JSON.stringify(props);
    const html = await render({ payload, decode: (input) => input });
    expect(html.body).toContain(">the body</p>");
  });

  test("it does a base64 decoding by default", async () => {
    const props = { bodyMarkdown: "the body" };
    const payload = JSON.stringify(props);
    const encodedPayload = Buffer.from(payload).toString("base64");
    const html = await render({ payload: encodedPayload });
    expect(html.body).toContain(">the body</p>");
  });

  test("waits the fetch promises to be resolved before returning", async () => {
    const fetch = jest
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
