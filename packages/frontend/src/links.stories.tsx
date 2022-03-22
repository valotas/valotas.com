import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageWithMarkdown } from "./PageWithMarkdown";
import { Link } from "./links";
import { CodeSpan } from "./marked/CodeSpan";

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
