import { ComponentMeta, ComponentStory } from "@storybook/react";
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
  <Page pkgVersion="6.6.6" {...args}>
    Simple content of the page
  </Page>
);

export const EmptyPage = Template.bind({});

export const PageWithTitle = Template.bind({});
PageWithTitle.args = {
  title: "Some other title",
};

export const PageWithTitleAndDate = Template.bind({});
PageWithTitleAndDate.args = {
  title: "This is page has a date",
  date: "2022-01-22",
};

export const PageWithTitleDateAndTags = Template.bind({});
PageWithTitleDateAndTags.args = {
  title: "This is page has a date",
  date: "2022-01-22",
  tags: ["devoxx", "javascript"],
};
