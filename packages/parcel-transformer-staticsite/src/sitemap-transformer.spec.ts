/* eslint-env jest */
import { _getAllTags } from "./sitemap-transformer.js";

describe("sitemap-transformer", () => {
  describe("_getAllTags", () => {
    test("returns a list with the keys", () => {
      const map = new Map([
        ["a", "b"],
        ["c", "d"],
      ]);
      const tags = _getAllTags(map);

      expect(Array.isArray(tags)).toBe(true);
    });

    test("returns a list with the keys sorted", () => {
      const map = new Map([
        ["c", "c"],
        ["a", "a"],
        ["b", "b"],
      ]);
      const tags = _getAllTags(map);

      expect(tags).toEqual(["a", "b", "c"]);
    });
  });
});
