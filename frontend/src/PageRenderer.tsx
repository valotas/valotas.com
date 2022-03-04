import React from "react";
import { PageWithItems, PageWithListProps } from "./PageWithItems";
import { PageWithMarkdown, PageWithMarkdownProps } from "./PageWithMarkdown";

function isPageWithListProps(props: any): props is PageWithListProps {
  return props && props.items && Array.isArray(props.items);
}

function isPageWithMarkdownProps(props: any): props is PageWithMarkdownProps {
  return props && props.bodyMarkdown;
}

export type PageRendererProps = {
  props: PageWithListProps | PageWithMarkdownProps;
};

export function PageRenderer({ props }: PageRendererProps) {
  console.log(props);
  if (isPageWithMarkdownProps(props)) {
    return <PageWithMarkdown {...props} />;
  }
  if (isPageWithListProps(props)) {
    return <PageWithItems {...props} />;
  }

  return null;
}
