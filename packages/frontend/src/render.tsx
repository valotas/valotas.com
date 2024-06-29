import { renderToString } from "react-dom/server";
import { FetchContent, createAsyncContextProvider } from "./AsyncContext.js";
import { PageRenderer, PageRendererProps } from "./PageRenderer.js";

const _fetch = fetch;

export type Logger = {
  log(msg: string): void;
};

export type RenderToStringProps = {
  fetchContent?: FetchContent;
  logger?: Logger;
} & PageRendererProps;

export async function render({
  fetchContent,
  logger,
  ...props
}: RenderToStringProps) {
  const fetch =
    fetchContent ||
    ((url: string) => {
      logger?.log(`Downloading ${url}`);
      return _fetch(url).then((b) => {
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
      <PageRenderer {...props} />
    </AsyncContextProvider>
  );

  // do the first renter to init the fetch calls
  renderToString(comp);

  // wait for all the fetch that has been done
  await all();
  skipSSE();

  //re-render the component
  const body = renderToString(comp);

  return { body };
}
