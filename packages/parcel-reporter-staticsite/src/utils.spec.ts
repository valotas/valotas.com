/* eslint-env jest */

import { createAlias } from "./utils";

describe("utils", () => {
  describe("createAlias", () => {
    test("is exported", () => {
      expect(createAlias).toBeTruthy();
    });

    test("returns an alias based on the given date and key", () => {
      expect(createAlias({ key: "key", date: "2020-10-22" })).toEqual(
        "2020/10/key.html"
      );
    });
  });
});
