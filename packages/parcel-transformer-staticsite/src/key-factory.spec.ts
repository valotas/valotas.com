/* eslint-env jest */

import { computeKey } from "./key-factory.js";

describe("key-factory", () => {
  test("returns the base name", () => {
    const key = computeKey("/path/to.md");

    expect(key).toEqual({ name: "to", ext: ".md" });
  });

  test("returns the previous directory name if the basename is index", () => {
    const key = computeKey("/path/index.md");

    expect(key).toEqual({ name: "path", ext: ".md" });
  });
});
