import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrismCodeBlock } from "./PrismCodeBlock";
import { Link } from "./links";

export default {
  title: PrismCodeBlock.name,
  component: PrismCodeBlock,
} as ComponentMeta<typeof PrismCodeBlock>;

const Template: ComponentStory<typeof PrismCodeBlock> = (args) => (
  <PrismCodeBlock {...args} />
);

const simpleCode = `
function hi() {
  return "hi";
}
`;

export const CodeWithoutLanguage = Template.bind({});
CodeWithoutLanguage.args = {
  code: simpleCode,
};

export const JavascriptCode = Template.bind({});
JavascriptCode.args = {
  code: simpleCode,
  language: "javascript",
};

export const CodeWithTitle = Template.bind({});
CodeWithTitle.args = {
  code: simpleCode,
  title: "This is a very interesting code",
};

const TemplateWithLink: ComponentStory<typeof PrismCodeBlock> = (args) => (
  <PrismCodeBlock {...args} title={<Link href="#">{args.title}</Link>} />
);

export const CodeWithLinkAsTitle = TemplateWithLink.bind({});
CodeWithLinkAsTitle.args = {
  code: simpleCode,
  title: "Click me!",
};
