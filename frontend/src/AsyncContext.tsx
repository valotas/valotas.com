import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
  DependencyList,
  EffectCallback,
} from "react";

export type FetchContent = (url: string) => Promise<string>;

export type AsyncContextState = {
  fetchContent: FetchContent;
  runSSE: boolean;
};

const AsyncContext = createContext<AsyncContextState>({
  fetchContent: (url) => fetch(url).then((b) => b.text()),
  runSSE: false,
});

export function createAsyncContextProvider({
  fetchContent,
  runSSE,
}: AsyncContextState) {
  const promises: Promise<string>[] = [];

  const wrappedFetchContent = (url: string) => {
    const promise = fetchContent(url);
    promises.push(promise);
    return promise;
  };

  const AsyncContextProvider = ({ children }: PropsWithChildren<unknown>) => {
    return (
      <AsyncContext.Provider
        value={{ fetchContent: wrappedFetchContent, runSSE }}
      >
        {children}
      </AsyncContext.Provider>
    );
  };

  return {
    AsyncContextProvider,
    all: () => Promise.all(promises),
    skipSSE: () => (runSSE = false),
  };
}

function useSSE(effect: EffectCallback, deps?: DependencyList) {
  useEffect(effect, deps);
  const { runSSE } = useContext(AsyncContext);

  // if runSSE, we call the given effect. That should be used on SSR
  if (runSSE) {
    effect();
  }
}

export function useFetch(url: string) {
  const { fetchContent } = useContext(AsyncContext);
  const [state, setState] = useState<{ content?: string; loading: boolean }>({
    loading: true,
  });

  useSSE(() => {
    fetchContent(url).then((content) => {
      setState({ content, loading: false });
    });
  }, [url]);

  return state;
}
