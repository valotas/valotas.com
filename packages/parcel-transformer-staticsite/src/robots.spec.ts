/* eslint-env jest */
import { parseRobots } from "./robots";

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
    `.trim()
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
