import React, { PropsWithChildren } from "react";
import { useFetch } from "../AsyncContext";
import { LinkWithIcon } from "../links";
import { PrismCodeBlock } from "../PrismCodeBlock";

function computeLanguage(file?: string) {
  if (file && file.indexOf(".js") > 0) {
    return "javascript";
  }
  if (file && file.indexOf(".java") > 0) {
    return "java";
  }
}

const GIST_SCRIPT =
  /script.*src=.*gist.github.com\/(([^/]*)\/)?(([^?]*)\.js(on)?)(\?(file=([^"]*)))?/;

export type GistDescription = { user: string; gistId: string; file?: string };

export function parseGist(html: string): GistDescription | null {
  const matches = GIST_SCRIPT.exec(html);
  if (!matches) {
    return null;
  }

  return {
    user: matches[2] || "valotas",
    gistId: matches[4],
    file: matches[8],
  };
}

export function Gist({
  user,
  gistId,
  file,
}: PropsWithChildren<GistDescription>) {
  const url = `https://gist.githubusercontent.com/${user}/${gistId}/raw/${file}`;
  const { content } = useFetch(url);
  const language = computeLanguage(file);

  let href = `https://gist.github.com/${user}/${gistId}`;

  const filetarget = (file || "").replace(/\./g, "-").toLocaleLowerCase();
  if (filetarget) {
    href = `${href}#file-${filetarget}`;
  }

  const link = (
    <LinkWithIcon
      href={href}
      target="_blank"
      icon="github"
      title={file || href}
    />
  );

  return (
    <PrismCodeBlock title={link} code={content || ""} language={language} />
  );
}
