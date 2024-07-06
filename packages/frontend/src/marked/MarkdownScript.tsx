import { useCallback } from "../jsx.js";
import { Script } from "../Script.js";
import { Gist, parseGist } from "./Gist.js";

export type MarksdownScriptProps = {
  tag?: string;
  type?: string;
  attrs?: {
    src: string;
  };
};

export function isMarkdownScript(node: any): node is MarksdownScriptProps {
  return node.tag === "script" && node.type === "11";
}

export function MarkdownScript({ tag, type, attrs }: MarksdownScriptProps) {
  const loadTwitterOnReload = useCallback(() => {
    const { twttr } = window as any;
    if (twttr) {
      twttr.widgets.load();
    }
  }, [0]);

  if (!tag || !type || !attrs) {
    return null;
  }

  const scriptSrc = attrs.src;
  const gist = parseGist(scriptSrc, true);
  if (gist) {
    return <Gist {...gist} />;
  }

  // add twitter scripts
  if (scriptSrc?.indexOf("platform.twitter.com/widgets.js") > 0) {
    return <Script src={scriptSrc} onReload={loadTwitterOnReload} />;
  }

  return null;
}
