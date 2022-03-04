import React from "react";
import { PageWithItems, PageWithListProps } from "./PageWithItems";
import { PageWithMarkdown, PageWithMarkdownProps } from "./PageWithMarkdown";

function getPageProps(input: PageRendererProps) {
  if ("payload" in input) {
    const decoded = (input.decode || atob)(input.payload);
    return JSON.parse(decoded) as PageWithListProps | PageWithMarkdownProps;
  }
  return input.props;
}

function isPageWithListProps(props: any): props is PageWithListProps {
  return props && props.items && Array.isArray(props.items);
}

function isPageWithMarkdownProps(props: any): props is PageWithMarkdownProps {
  return props && props.bodyMarkdown;
}

export type PageRendererProps =
  | {
      payload: string;
      decode?: (input: string) => string;
    }
  | { props: PageWithListProps | PageWithMarkdownProps };

export function PageRenderer(props: PageRendererProps) {
  const pageProps = getPageProps(props);

  if (isPageWithMarkdownProps(pageProps)) {
    return <PageWithMarkdown {...pageProps} />;
  }
  if (isPageWithListProps(pageProps)) {
    return <PageWithItems {...pageProps} />;
  }

  return null;
}
