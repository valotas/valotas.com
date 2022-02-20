import * as marked from "marked";
import { render } from "../../renderToString";
import { createComponentTree } from "./createComponentTree";

function renderToStaticMarkup(source, options?) {
  const tree = createComponentTree(source, options);
  return render(tree);
}

describe("createComponentTree", () => {
  it("should transform gist script to a gist component for java files", () => {
    const html = renderToStaticMarkup(
      '<script src="https://gist.github.com/1240545.js?file=ServletUsingCustomResponse.java"></script>'
    );
    expect(html).toContain(
      '<pre data-gist-id="1240545" data-gist-user="valotas" data-gist-file="ServletUsingCustomResponse.java">'
    );
  });

  it("should transform gist script to a gist component for js files", () => {
    const html = renderToStaticMarkup(
      '<script src="https://gist.github.com/valotas/1175447.js?file=scrapy.js"></script>'
    );
    expect(html).toContain(
      '<pre data-gist-id="1175447" data-gist-user="valotas" data-gist-file="scrapy.js">'
    );
  });

  it("should transform gist script to a gist component for sh files", () => {
    const html = renderToStaticMarkup(
      '<script src="https://gist.github.com/valotas/1000094.js?file=tomcat.sh"></script>'
    );
    expect(html).toContain(
      '<pre data-gist-id="1000094" data-gist-user="valotas" data-gist-file="tomcat.sh">'
    );
  });

  it("should render paragraphs with mix span and code blocks", () => {
    const source = "This is a paragraph  with `code block`.";
    const expected = marked(source).trim();
    const html = renderToStaticMarkup(source);
    expect(html).toContain(expected);
  });

  it("should transform links to anchors", () => {
    const source = "Go to http://google.com/";
    const expected = marked(source).trim();
    const html = renderToStaticMarkup(source);
    expect(html).toContain(expected);
  });

  it("should handle escaping", () => {
    const source = 'I\'ve used to use "©" charachters';
    const expected = marked(source, {
      smartypants: true,
    }).trim();
    const html = renderToStaticMarkup(source);
    expect(html).toContain(expected);
  });

  it("should links with inline code", () => {
    const source = "[`DAO`](http://link.to/dao)s";
    const expected = marked(source, {
      smartypants: true,
    }).trim();
    const html = renderToStaticMarkup(source);
    expect(html).toContain(expected);
  });

  it("should mark the first leter of paragraphs", () => {
    const source = `
This is the first paragraph

And this is the second one
        `;
    const html = renderToStaticMarkup(source, { firstLetterSpan: true });
    expect(html).toContain(
      '<p><span class="first-letter">T</span>his is the first paragraph</p>'
    );
  });

  it("should mark the first leter of only the first paragraph", () => {
    const source = `
This is the first paragraph

And this is the second one
        `;
    const html = renderToStaticMarkup(source, { firstLetterSpan: true });
    expect(html).toContain("<p>And this is the second one</p>");
  });

  it("should handle first paragraphs with inline objects", () => {
    const source = `
Some *strange* first paragraph
        `;
    const html = renderToStaticMarkup(source, { firstLetterSpan: true });
    expect(html).toContain(
      '<p><span class="first-letter">S</span>ome <em>strange</em>'
    );
  });

  it("should handle greater/lower than charachters right", () => {
    const source = `
Asume this ><&><
        `;
    const html = renderToStaticMarkup(source, { firstLetterSpan: true });
    expect(html).toContain("this &gt;&lt;&amp;&gt;&lt;");
  });

  it("should wrap pre blocks in a .codeblock", () => {
    const source = `\`\`\`
function xyz() {};
\`\`\``;
    const html = renderToStaticMarkup(source);
    expect(html).toContain(
      '<div class="codeblock"><pre><code>function xyz() {};</code></pre></div>'
    );
  });
});
