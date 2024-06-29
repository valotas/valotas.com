import { PropsWithChildren, useContext, useCallback, useState } from "react";
import { AsyncContext } from "./AsyncContext.js";

export function FetchTracker({ children }: PropsWithChildren<unknown>) {
  const {
    fetchContent,
    runSSE,
    currentFetchCount: parrentCounter,
  } = useContext(AsyncContext);
  const [currentFetchCount, setCurrentFetchCount] = useState(0);

  const wrappedFetchContent = useCallback(
    (url: string) => {
      setCurrentFetchCount((prev) => prev + 1);

      return fetchContent(url).then((result) => {
        setCurrentFetchCount((prev) => prev - 1);
        return result;
      });
    },
    [fetchContent],
  );

  return (
    <AsyncContext.Provider
      value={{
        fetchContent: wrappedFetchContent,
        runSSE,
        currentFetchCount: parrentCounter || currentFetchCount,
      }}
    >
      {children}
    </AsyncContext.Provider>
  );
}

export function useFetchCounter() {
  const { currentFetchCount } = useContext(AsyncContext);
  return currentFetchCount || 0;
}
