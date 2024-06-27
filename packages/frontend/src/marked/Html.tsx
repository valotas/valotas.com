import React, { useCallback } from "react";
import { HtmlRendererProps } from "react-marked-renderer";
import { Script } from "../Script.js";
import { Gist, parseGist } from "./Gist.js";

const twitterUrl = "//platform.twitter.com/widgets.js";

export function Html({ raw }: HtmlRendererProps) {
  const loadTwitterOnReload = useCallback(() => {
    const { twttr } = window as any;
    if (twttr) {
      twttr.widgets.load();
    }
  }, [0]);

  const gist = parseGist(raw);
  if (gist) {
    return <Gist {...gist} />;
  }

  const html = raw.replace(/<script.*<\/?script>/g, "");
  const hasTwitter = raw.indexOf("twitter-tweet") >= 0;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      {hasTwitter && <Script src={twitterUrl} onReload={loadTwitterOnReload} />}
    </>
  );
}
