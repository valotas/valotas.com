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

  
  
});
