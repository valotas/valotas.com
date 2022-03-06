import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageWithItems } from "./PageWithItems";

export default {
  title: "PageWithItems",
  component: PageWithItems,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PageWithItems>;

const Template: ComponentStory<typeof PageWithItems> = (args) => (
  <PageWithItems title="Page with list" pkgVersion="6.6.6" {...args} />
);

export const EmptyPage = Template.bind({});

export const PageWith2Items = Template.bind({});
PageWith2Items.args = {
  items: [
    {
      date: "2013-05-11",
      title: "A very important article",
      href: "/a-very-important-article/",
      description: `This website is for me a continuous effort of skills improvement. It started with a ready static website generator to end up to something completelly custom made. One thing I did not touch though was the css stuff.`,
    },
    {
      date: "2014-12-25",
      title: "Another important role",
      href: "/another-important-role",
      description: `
Lately I came across a problem for which the standard
[\`Promise\`][promise]'s api wasn't enough. I needed
something like \`Promise.all\` but I had to make sure
that the actions array will get executed in sequence

[promise]: https://www.promisejs.org/
      `,
    },
  ],
};
