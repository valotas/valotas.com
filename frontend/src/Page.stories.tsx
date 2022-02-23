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
  
  This is the first paragraph of our content
  `,
};
