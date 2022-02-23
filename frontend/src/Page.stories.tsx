import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Page } from "./Page";

export default {
  title: "Page",
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => (
  <Page pkgVersion="6.6.6" pkgName="@valotas/frontend" {...args} />
);

export const EmptyPage = Template.bind({});

export const PageWithMarkdown = Template.bind({});
PageWithMarkdown.args = {
  bodyMarkdown: `
  # This is a title

  This is the first paragraph of our content.

  This is the second paragraph of our content.

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
