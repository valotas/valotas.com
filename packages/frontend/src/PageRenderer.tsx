import { useCallback, useEffect, useState } from "react";
import { PageWithItems, PageWithListProps } from "./PageWithItems";
import { PageWithMarkdown, PageWithMarkdownProps } from "./PageWithMarkdown";
import { createTitle } from "./title";
import { history } from "./History";

function getPageProps(input: PageRendererProps) {
  if ("payload" in input) {
    return JSON.parse(input.payload) as
      | PageWithListProps
      | PageWithMarkdownProps;
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
  | { payload: string }
  | { props: PageWithListProps | PageWithMarkdownProps };

function usePageProps(initial: PageRendererProps) {
  const [props, updateProps] = useState(initial);
  const [scrollTop, updateScrollTop] = useState(false);

  const handlePopState = useCallback(
    (e: any) => {
      const state = e.detail?.state || e.state;
      updateProps({ payload: state });
      updateScrollTop(e.detail ? true : false);
    },
    [0],
  );

  useEffect(() => {
    return history().onPushState(handlePopState);
  }, [0]);

  return { pageProps: getPageProps(props), scrollTop };
}

export function PageRenderer(props: PageRendererProps) {
  const { pageProps, scrollTop } = usePageProps(props);

  useEffect(() => {
    document.title = createTitle(pageProps.title);
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pageProps.title, scrollTop]);

  if (isPageWithMarkdownProps(pageProps)) {
    return <PageWithMarkdown {...pageProps} />;
  }
  if (isPageWithListProps(pageProps)) {
    return <PageWithItems {...pageProps} />;
  }

  return null;
}
