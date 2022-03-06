import { useEffect } from "react";

export type ScriptProps = { src: string };

const loaded: string[] = [];

export function Script({ src }: ScriptProps) {
  useEffect(() => {
    if (loaded.indexOf(src) >= 0) {
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
