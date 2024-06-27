/* eslint-env jest */
import * as path from "path";
import { fileURLToPath } from "node:url";
import { NodeFS } from "@parcel/fs";
import { _parseSitemapContent } from "./sitemap.js";

const fs = new NodeFS();

const __filename = fileURLToPath(import.meta.url);
const filePath = path.resolve(
  __filename,
  "..",
  "..",
  "..",
  "web",
  "src",
  "sitemap.txt",
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

  test("return other files too as dependencies", async () => {
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
      "./articles/tomcat-initd-script.md",
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
        path.join(filePath, "..", "./articles/tomcat-initd-script.md"),
      ),
    );
  });

  test("getDependenciesGroupedByExt return the dependencies grouped", async () => {
    const sitemap = await _parseSitemapContent({
      content: `
      ./articles/tomcat-initd-script.md
      ./google.html
      `,
      filePath,
      fs,
    });

    const { md, other } = sitemap.getDependenciesGroupedByExt();
    expect(md).toHaveLength(1);
    expect(other).toHaveLength(1);
  });

  xtest("resolves and returns glob patterns", async () => {
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
    `.trim(),
    );
  });
});
