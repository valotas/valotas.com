import React from "react";
import { DEFAULT_MARKDOWN_RENDERERS, Markdown } from "react-marked-renderer";
import { CodeBlock } from "./CodeBlock.js";
import { Html } from "./Html.js";

const renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
  html: Html,
  codeblock: CodeBlock,
};

export type MarkedContentProps = { raw: string };

export function MarkedContent({ raw }: MarkedContentProps) {
  return (
    <div data-testid="marked">
      <Markdown markdown={raw} renderers={renderers} />
    </div>
  );
}
