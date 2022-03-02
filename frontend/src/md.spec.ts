import * as md from "./md";

describe("md", () => {
  it("exports parse function", () => {
    expect(md.parse).toBeTruthy();
  });

  describe("parse", () => {
    it("returns the raw as is", () => {
      const initial = "# content";
      const { raw } = md.parse(initial);

      expect(raw).toBe(initial);
    });

    it("returns the meta defined in the file", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
---

# Content
      `;
      const { meta } = md.parse(initial);

      expect(meta).toEqual({
        title: "the title",
        date: "2022-10-11",
        template: "template",
        draft: false,
      });
    });

    it("returns the raw without the metadata of the file", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
---

# Content

this is some paragraph
      `;
      const { raw } = md.parse(initial);

      expect(raw.trim()).toEqual(
        `
# Content

this is some paragraph
      `.trim()
      );
    });

    it("returns the raw of the first section", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
---

this is the description of the first section

## Second section

This is some paragraph of the second section
      `;
      const { firstSection } = md.parse(initial);

      expect(firstSection.trim()).toEqual(
        `this is the description of the first section`
      );
    });

    it("returns no first section if none is given", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
---

## Second section

This is some paragraph of the second section
      `;
      const { firstSection } = md.parse(initial);

      expect(firstSection.trim()).toEqual("");
    });
  });
});
