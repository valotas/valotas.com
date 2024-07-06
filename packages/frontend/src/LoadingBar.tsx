import { useMemo } from "./jsx.js";
import { useFetchCounter } from "./FetchTracker.js";

export function LoadingBar() {
  const counter = useFetchCounter();

  const loading = useMemo(() => {
    if (counter > 0) {
      return "loading-bar";
    }
    return "";
  }, [counter]);

  return (
    <div className={`fixed w-full h-1`}>
      <div className={`bg-gray-500 h-full w-0 ${loading}`}></div>
    </div>
  );
}
