import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageWithMarkdown } from "./PageWithMarkdown.js";
import { Link } from "./links.js";
import { CodeSpan } from "./marked/CodeSpan.js";

export default {
  title: "links",
  component: Link,
} as ComponentMeta<typeof PageWithMarkdown>;

const Template: ComponentStory<typeof Link> = (args) => (
  <Link {...args}>This is a link</Link>
);

export const SimpleLink = Template.bind({});

export const LinkWithCode = () => {
  return (
    <Link href={"#"}>
      <CodeSpan
        children={"This is a codespan"}
        type={"codespan"}
        raw={""}
        text={""}
      />
    </Link>
  );
};
