/* eslint-env jest */
const path = require("path");
const { NodeFS } = require("@parcel/fs");
const { _parseSitemapContent } = require("./sitemap");

const fs = new NodeFS();

const filePath = path.resolve(
  __filename,
  "..",
  "..",
  "..",
  "web",
  "src",
  "sitemap.txt"
);

describe("sitemap", () => {
  test("returns an object", () => {
    const sitemap = _parseSitemapContent({
      content: ` `,
      filePath,
      fs,
    });

    expect(sitemap).toBeTruthy();
  });

  test("returns no dependencies if none found", async () => {
    const sitemap = await _parseSitemapContent({
      content: ` `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()).toHaveLength(0);
  });

  test("returns the md files as dependencies", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()).toHaveLength(1);
  });

  test("other files too as dependencies", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      ./google.html
      `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()).toHaveLength(2);
  });

  test("returns the md files as dependencies with the right specifier", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()[0].specifier).toBe(
      "./articles/tomcat-initd-script.md"
    );
  });

  test("returns the md files as dependencies with the right key", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()[0].key).toBe("tomcat-initd-script");
  });

  test("returns the md files as dependencies with the right filepath", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()[0].filePath).toBe(
      path.resolve(
        path.join(filePath, "..", "./articles/tomcat-initd-script.md")
      )
    );
  });

  test("resolves and returns glob patterns", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./**/g*.md
      `,
      filePath,
      fs,
    });

    expect(sitemap.getDependencies()).toHaveLength(6);
  });

  test("getCode returns each entry as a url", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      /some-other-page.html
      `,
      filePath,
      fs,
    });

    expect(sitemap.getCode()).toBe(
      `
/tomcat-initd-script/
/some-other-page.html
    `.trim()
    );
  });
});
