import { useEffect } from "./jsx.js";

export type ScriptProps = { src: string; onReload?: () => void };

const loaded: string[] = [];

export function Script({ src, onReload }: ScriptProps) {
  useEffect(() => {
    if (loaded.indexOf(src) >= 0) {
      if (onReload) {
        onReload();
      }
      return;
    }

    loaded.push(src);

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }, [0]);
  return null;
}
