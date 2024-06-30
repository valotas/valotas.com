/* eslint-env jest */
import { parseRobots } from "./robots.js";

describe("robots", () => {
  test("returns empty rules for empty content", () => {
    const robots = parseRobots("");

    expect(robots.getCode()).toBe("");
  });

  test("returns the content as is", () => {
    const code = `
Rule1: value1
Rule2: value2
`.trim();

    const robots = parseRobots(code);

    expect(robots.getCode()).toBe(code);
  });

  test("updates the sitemap value", () => {
    const code = `
Rule1: value1
Sitemap: value2
`.trim();

    const robots = parseRobots(code);
    robots.setSitemap("/path/to/sitemap.txt");

    expect(robots.getCode()).toBe(
      `
Rule1: value1
Sitemap: /path/to/sitemap.txt    
    `.trim(),
    );
  });

  test.each([
    "./path/to/sitemap.txt",
    "/path/to/sitemap.txt",
    "path/to/sitemap.txt",
  ])("add the base url to sitemap value: %s", (sitemap) => {
    const code = `
Rule1: value1
Sitemap: ${sitemap}
`.trim();

    const robots = parseRobots(code);

    expect(robots.getCode("https://foo.bar")).toBe(
      `
Rule1: value1
Sitemap: https://foo.bar/path/to/sitemap.txt    
    `.trim(),
    );
  });

  test("retrieves the sitemap value", () => {
    const code = `
Rule1: value1
Sitemap: value2
`.trim();

    const robots = parseRobots(code);

    expect(robots.getSitemap()).toBe("value2");
  });
});
