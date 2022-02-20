import React from "react";
import { DEFAULT_MARKDOWN_RENDERERS, Markdown } from "react-marked-renderer";

const renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
};

export type MarkedContentProps = { raw: string };

export function MarkedContent({ raw }: MarkedContentProps) {
  return (
    <div data-testid="marked">
      <Markdown markdown={raw} renderers={renderers} />
    </div>
  );
}
