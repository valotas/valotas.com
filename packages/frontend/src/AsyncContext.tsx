import {
  DependencyList,
  EffectCallback,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type FetchContent = (url: string) => Promise<string>;

export type AsyncContextState = {
  fetchContent: FetchContent;
  runSSE: boolean;
  currentFetchCount?: number;
};

export const AsyncContext = createContext<AsyncContextState>({
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

export type UseFetchResult = { content?: string; loading: boolean };

const cache = new Map<string, UseFetchResult>();
const loading = { loading: true };

export function useFetch(url: string): UseFetchResult {
  const { fetchContent } = useContext(AsyncContext);
  const [_, setLoading] = useState(true);

  useSSE(() => {
    if (cache.has(url)) {
      return;
    }

    cache.set(url, loading);

    fetchContent(url).then((content) => {
      cache.set(url, { content, loading: false });
      setLoading(false);
    });
  }, [url]);

  return cache.get(url) || loading;
}
