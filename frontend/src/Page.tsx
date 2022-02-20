import React from "react";
import type { FooterProps } from "./Footer";
import { Footer } from "./Footer.js";
import { MarkedContent } from "./marked/MarkedContent.js";

export type PageProps = FooterProps & { bodyMarkdown?: string };

export function Page({ bodyMarkdown, ...footerProps }: PageProps) {
  return (
    <div data-testid="page">
      {bodyMarkdown && <MarkedContent raw={bodyMarkdown} />}
      <Footer {...footerProps} />
    </div>
  );
}
