import { MetaFile } from "./MetaFile";

describe("MetaFile", () => {
  describe("createFromRawMd", () => {
    const raw = `
---
title: Tomcat init.d script
author: valotas
date: 2011-05-14
published: false
---

The actual content

`;

    it("should extract the yalm info a and raw", () => {
      const file = MetaFile.createFromRawMd(raw);
      expect(file.title).toEqual("Tomcat init.d script");
      expect(file.date).toEqual("2011-05-14");
      expect(file.raw).toEqual("The actual content");
      expect(file.published).toEqual(false);
    });

    it("should use null if a property has not been found", () => {
      const file = MetaFile.createFromRawMd(`
---
title: Tomcat init.d script
date: 2011-05-14
---

The actual content

`);
      expect(file.title).toEqual("Tomcat init.d script");
      expect(file.date).toEqual("2011-05-14");
      expect(file.raw).toEqual("The actual content");
    });

    it("should use extract dates containing :", () => {
      const file = MetaFile.createFromRawMd(`
---
date: 2011-05-14 12:13
title: Tomcat init.d script
---

The actual content

`);
      expect(file.title).toEqual("Tomcat init.d script");
      expect(file.date).toEqual("2011-05-14 12:13");
      expect(file.raw).toEqual("The actual content");
    });
  });

  describe("moment()", () => {
    it("should parse given date and return a moment instance", () => {
      const meta = new MetaFile({
        date: "2011-05-14",
        title: "title",
        type: "article",
        path: "path",
      });

      const actual = meta.moment();
      expect(actual).toBeTruthy();
      expect(actual.isValid()).toBe(true);
    });

    it("should throw exception if given date is not in a right format", () => {
      const meta = new MetaFile({
        date: "2015/05/01",
        title: "title",
        path: "path",
        type: "article",
      });

      try {
        meta.moment();
        fail("An exception is expected");
      } catch (ex) {
        expect(ex).toBeTruthy();
      }
    });
  });
});
