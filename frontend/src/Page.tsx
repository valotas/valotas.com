import React from "react";
import type { FooterProps } from "./Footer";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { MarkedContent } from "./marked/MarkedContent.js";

export type PageProps = FooterProps & { bodyMarkdown?: string; title?: string };

export function Page({ bodyMarkdown, title, ...other }: PageProps) {
  return (
    <div data-testid="page">
      <Header title={title || other.pkgName || ""} />
      {bodyMarkdown && <MarkedContent raw={bodyMarkdown} />}
      <Footer {...other} />
    </div>
  );
}
