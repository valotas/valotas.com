import React from "react";
import { HtmlRendererProps } from "react-marked-renderer";
import { Script } from "../Script";
import { Gist, parseGist } from "./Gist";

const twitterUrl = "//platform.twitter.com/widgets.js";

export function Html({ raw }: HtmlRendererProps) {
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
      {hasTwitter && <Script src={twitterUrl} />}
    </>
  );
}
