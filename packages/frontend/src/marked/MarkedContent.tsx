import React from "react";
import { DEFAULT_MARKDOWN_RENDERERS, Markdown } from "react-marked-renderer";
import { CodeBlock } from "./CodeBlock";
import { CodeSpan } from "./CodeSpan";
import { Heading } from "./Heading";
import { Html } from "./Html";
import { List } from "./List";
import { MarkedLink } from "./MarkedLink";

const renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
  html: Html,
  codeblock: CodeBlock,
  codespan: CodeSpan,
  heading: Heading,
  link: MarkedLink,
  list: List,
};

export type MarkedContentProps = { raw: string };

export function MarkedContent({ raw }: MarkedContentProps) {
  return (
    <div data-testid="marked">
      <Markdown markdown={raw} renderers={renderers} />
    </div>
  );
}
