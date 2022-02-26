import React from "react";
import { Page, PageProps } from "./Page";
import { MarkedContent } from "./marked/MarkedContent";

export type PageWithMarkdownProps = PageProps & {
  bodyMarkdown?: string;
};

export function PageWithMarkdown({
  bodyMarkdown,
  ...pageProps
}: PageWithMarkdownProps) {
  return (
    <Page {...pageProps}>
      {bodyMarkdown && <MarkedContent raw={bodyMarkdown} />}
    </Page>
  );
}
