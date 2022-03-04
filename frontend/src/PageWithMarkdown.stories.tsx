import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import trueArticle from "../../web/src/articles/testing-rxjs.md";
import { PageWithMarkdown } from "./PageWithMarkdown";

export default {
  title: "PageWithMarkdown",
  component: PageWithMarkdown,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PageWithMarkdown>;

const Template: ComponentStory<typeof PageWithMarkdown> = (args) => (
  <PageWithMarkdown pkgVersion="6.6.6" {...args} />
);

export const EmptyPage = Template.bind({});

export const PageWithStaticMarkdown = Template.bind({});
PageWithStaticMarkdown.args = {
  bodyMarkdown: `
  # This is a title

  This is the first paragraph of our content.

  ## This is an h2
  This is the second paragraph of our content.

  ### This is an h3
  This is the third paragraph of our content.

  #### This is an h4
  This is the fourth paragraph of our content.

  ##### This is an h5
  This is the fifth paragraph of our content.

  ###### This is an h6
  This is the 6th paragraph of our content.

  This paragraph contains some [link to live24.gr](https://live24.gr) and
  one to [example.com][example]

  This paragraph contains some \`inline code\` and a ***bold statement***. 

  >
  > This is a quoted paragraph with something **really important**
  >
  >> And this is a quote within a quote
  >

  And here some listing items:
  - this is a listed item
  - and this is another listed item
  - and here is a listed item with a \`code span\`
  - and another one with an [inline line to admin.ch](https://admin.ch/)
  - and a final one referencing [example.com]:[example]

  [example]:[https://example.com/]
  `,
};

export const PageWithCodeBlock = Template.bind({});
PageWithCodeBlock.args = {
  bodyMarkdown: `
  Here is the important code in js:
  \`\`\`js
function assertEquals (actual, expected) {
  //we will use jasmine's api for the assertion:
  expect(actual).toEqual(expected);
}

const scheduler = new Rx.TestScheduler(assertEquals);
  \`\`\`

  And here some important java code:
  \`\`\`java
  public class XFFAwareReq extends HttpServletRequestWrapper {
  
    public XFFAwareReq(HttpServletRequest request) {
      super(request);
    }
  
    @Override
    public String getRemoteAddr() {
      String xff = getXForwardedFor();
      return xff != null ? xff : super.getRemoteAddr();
    }
  
    public String getXForwardedFor() {
      String xff = getHeader("X-Forwarded-For");
      if (xff == null || "".equals(xff)) return null;
      return getIpFromXFF(xff);
    }
  
    protected static final String getIpFromXFF(String xff) {
     //extract and return the ip from the X-Forwarded-For header
    }
  }
  \`\`\`
  `,
};

export const PageWithGist = Template.bind({});
PageWithGist.args = {
  bodyMarkdown: `
  And here is a very interesting gist:

  <script src="https://gist.github.com/valotas/999051.js?file=GuiceHandler.java"></script>

  While there is another one in javascript:
  
  <script src="https://gist.github.com/valotas/1175447.js?file=scrapy.js"></script>
  `,
};

const content = trueArticle.split("---\n");

export const PageWithFullArticle = Template.bind({});
PageWithFullArticle.args = {
  bodyMarkdown: content[content.length - 1],
};
