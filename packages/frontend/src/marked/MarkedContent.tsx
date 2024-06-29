import React from "react";
// @ts-expect-error TS2305
import { DEFAULT_MARKDOWN_RENDERERS, Markdown } from "react-marked-renderer";
import { CodeBlock } from "./CodeBlock.js";
import { CodeSpan } from "./CodeSpan.js";
import { Heading } from "./Heading.js";
import { Html } from "./Html.js";
import { List } from "./List.js";
import { MarkedLink } from "./MarkedLink.js";

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
