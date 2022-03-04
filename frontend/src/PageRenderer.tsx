import React, { useEffect, useState, useCallback } from "react";
import { PageWithItems, PageWithListProps } from "./PageWithItems";
import { PageWithMarkdown, PageWithMarkdownProps } from "./PageWithMarkdown";
import { createTitle } from "./title";

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

function usePageProps(initial: PageRendererProps) {
  const [props, updateProps] = useState(initial);

  const handlePopState = useCallback(
    (e: any) => {
      const state = e.detail?.state || e.state;
      updateProps({ payload: state });
    },
    [0]
  );

  useEffect(() => {
    document.addEventListener("pushstate", handlePopState);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("pushstate", handlePopState);
    };
  }, [0]);

  return getPageProps(props);
}

export function PageRenderer(props: PageRendererProps) {
  const pageProps = usePageProps(props);

  useEffect(() => {
    document.title = createTitle(pageProps.title);
  }, [pageProps.title]);

  if (isPageWithMarkdownProps(pageProps)) {
    return <PageWithMarkdown {...pageProps} />;
  }
  if (isPageWithListProps(pageProps)) {
    return <PageWithItems {...pageProps} />;
  }

  return null;
}
