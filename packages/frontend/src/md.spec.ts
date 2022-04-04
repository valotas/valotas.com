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
      const { raw: _, description: __, ...meta } = md.parse(initial);

      expect(meta).toEqual({
        title: "the title",
        date: "2022-10-11",
        template: "template",
        draft: false,
        skipIndex: false,
        tags: [],
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
      const { description } = md.parse(initial);

      expect(description.trim()).toEqual(
        `this is the description of the first section`
      );
    });

    it("returns the raw of the first section for descriptions containing links", () => {
      const initial = `
---
title: Why do we need getters and setters ?
date: 2013-12-14
---


Recently I [had a look at the Dart programming language][thoughts-on-dart] and that reminded me of the getters and setters mechanism that someone has with [C#][csharp]. So let's have a look at them.

[thoughts-on-dart]: http://valotas.com/dart-language/
[csharp]: http://en.wikipedia.org/wiki/C_Sharp_(programming_language)

## Where we use them
Well, the idea in OO languages is very simple. You have a class and you have a property, a field or whatever piece of data that you want to access:
      `;
      const { description } = md.parse(initial);

      expect(description.trim()).toEqual(
        `
Recently I [had a look at the Dart programming language][thoughts-on-dart] and that reminded me of the getters and setters mechanism that someone has with [C#][csharp]. So let's have a look at them.

[thoughts-on-dart]: http://valotas.com/dart-language/
[csharp]: http://en.wikipedia.org/wiki/C_Sharp_(programming_language)`.trim()
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
      const { description } = md.parse(initial);

      expect(description.trim()).toEqual("");
    });

    it("returns no first section even if it is a ###", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
---

### first section

This is some paragraph of the second section
      `;
      const { description } = md.parse(initial);

      expect(description.trim()).toEqual("");
    });

    it("returns the tags of the file in a list", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
tags: tag1
---

### first section

This is some paragraph of the second section
      `;
      const { tags } = md.parse(initial);

      expect(tags.length).toEqual(1);
      expect(tags).toEqual(["tag1"]);
    });

    it("returns the tags of the file in a list", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
tags: tag1, tag2
---

### first section

This is some paragraph of the second section
      `;
      const { tags } = md.parse(initial);

      expect(tags).toEqual(["tag1", "tag2"]);
    });

    it("returns the tags of the file in a list sorted", () => {
      const initial = `
---
title: the title
date: 2022-10-11
template: template
tags: tag2, tag1
---

### first section

This is some paragraph of the second section
      `;
      const { tags } = md.parse(initial);

      expect(tags).toEqual(["tag1", "tag2"]);
    });
  });
});
