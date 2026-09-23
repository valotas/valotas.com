import { MarkedContent } from "./marked/MarkedContent.js";
import { Page, PageProps } from "./Page.js";

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
