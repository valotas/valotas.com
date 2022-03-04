import React from "react";
import { renderToString } from "react-dom/server";
import nfetch from "node-fetch";
import { setup } from "./twind";
import { asyncVirtualSheet, getStyleTag } from "twind/server";
import type { PageWithMarkdownProps } from "./PageWithMarkdown";
import { PageWithMarkdown } from "./PageWithMarkdown";
import { createAsyncContextProvider, FetchContent } from "./AsyncContext";
import { PageWithItems, PageWithListProps } from "./PageWithItems";

const sheet = asyncVirtualSheet();
setup({ sheet });

export type Logger = {
  log(msg: string): void;
};

export type RenderToStringProps<T> = {
  fetchContent?: FetchContent;
  logger?: Logger;
  component: React.ComponentFactory<T, any>;
  props: T;
};

async function _render<T>({
  fetchContent,
  logger,
  component: Component,
  props,
}: RenderToStringProps<T>) {
  const fetch =
    fetchContent ||
    ((url: string) => {
      logger?.log(`Downloading ${url}`);
      return nfetch(url).then((b) => {
        if (!b.ok) {
          throw new Error(`Could not download ${url}`);
        }
        return b.text();
      });
    });

  const { all, skipSSE, AsyncContextProvider } = createAsyncContextProvider({
    fetchContent: fetch,
    runSSE: true,
  });

  const comp = (
    <AsyncContextProvider>
      <Component {...props} />
    </AsyncContextProvider>
  );

  // do the first renter to init the fetch calls
  renderToString(comp);

  // wait for all the fetch that has been done
  await all();
  skipSSE();

  // prepare the extraction of stylesheet
  sheet.reset();

  //re-render the component
  const body = renderToString(comp);

  const styles = getStyleTag(sheet);

  return { body, styles };
}

export type RenderPageProps = PageWithMarkdownProps & {
  fetchContent?: FetchContent;
  logger?: Logger;
};

export function render({
  fetchContent,
  logger,
  ...pageProps
}: RenderPageProps) {
  return _render({
    fetchContent,
    logger,
    component: PageWithMarkdown,
    props: pageProps,
  });
}

export type RenderManyProps = PageWithListProps & {
  fetchContent?: FetchContent;
  logger?: Logger;
};

export function renderMany({
  fetchContent,
  logger,
  ...props
}: RenderManyProps) {
  return _render({
    fetchContent,
    logger,
    component: PageWithItems,
    props: props,
  });
}
