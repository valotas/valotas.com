import { Page, PageProps } from "./Page.js";
import { MarkedContent } from "./marked/MarkedContent.js";

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
