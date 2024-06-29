import { renderToString } from "react-dom/server";
import { asyncVirtualSheet, getStyleTag } from "twind/server";
import { setup } from "./twind.js";
import { FetchContent, createAsyncContextProvider } from "./AsyncContext.js";
import { PageRenderer, PageRendererProps } from "./PageRenderer.js";

const _fetch = fetch;
const sheet = asyncVirtualSheet();
setup({ sheet });

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

  // prepare the extraction of stylesheet
  sheet.reset();

  //re-render the component
  const body = renderToString(comp);

  const styles = getStyleTag(sheet);

  return { body, styles };
}
