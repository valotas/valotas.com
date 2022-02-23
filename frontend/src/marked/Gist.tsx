import React, { PropsWithChildren } from "react";
import { useFetch } from "../AsyncContext";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { PrismCodeBlock } from "../PrismCodeBlock";
import { tw } from "../twind";

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
    user: matches[2],
    gistId: matches[4],
    file: matches[8],
  };
}

export function Gist({
  user,
  gistId,
  file,
}: PropsWithChildren<GistDescription>) {
  const { content } = useFetch(
    `https://gist.githubusercontent.com/${user}/${gistId}/raw/${file}`
  );
  const language = computeLanguage(file);

  let href = `https://gist.github.com/${user}/${gistId}`;

  const filetarget = (file || "").replace(/\./g, "-").toLocaleLowerCase();
  if (filetarget) {
    href = `${href}#file-${filetarget}`;
  }

  const link = (
    <Link href={href} target="_blank" className={tw`text-gray-500`}>
      <Icon name="github" size="4" className={tw`fill-gray-500`} />
      <span className={tw`pl-2`}>{file || href}</span>
    </Link>
  );

  return <PrismCodeBlock title={link} code={content} language={language} />;
}
