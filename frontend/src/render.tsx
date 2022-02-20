import React from "react";
import { renderToString } from "react-dom/server.js";
import nfetch from "node-fetch";
import type { PageProps } from "./Page";
import { Page } from "./Page.js";
import { createAsyncContextProvider, FetchContent } from "./AsyncContext.js";

export type Logger = {
  log(msg: string): void;
};

export type RenderPageProps = PageProps & {
  fetchContent?: FetchContent;
  logger?: Logger;
};

export async function render({
  fetchContent,
  logger,
  ...pageProps
}: RenderPageProps) {
  const fetch =
    fetchContent ||
    ((url: string) => {
      logger?.log(`Downloading ${url}`);
      return nfetch(url).then((b) => b.text());
    });

  const { all, skipSSE, AsyncContextProvider } = createAsyncContextProvider({
    fetchContent: fetch,
    runSSE: true,
  });

  const component = (
    <AsyncContextProvider>
      <Page {...pageProps} />
    </AsyncContextProvider>
  );

  // do the first renter to init the fetch calls
  renderToString(component);

  // wait for all the fetch that has been done
  await all();
  skipSSE();

  //re-render the component
  return renderToString(component);
}
