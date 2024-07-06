import { PropsWithChildren } from "../jsx.js";
import { useFetch } from "../AsyncContext.js";
import { LinkWithIcon } from "../links.js";
import { PrismCodeBlock } from "../PrismCodeBlock.js";

function computeLanguage(file?: string) {
  if (file && file.indexOf(".js") > 0) {
    return "javascript";
  }
  if (file && file.indexOf(".java") > 0) {
    return "java";
  }
}

const GIST_SRC =
  /.*gist.github.com\/(([^/]*)\/)?(([^?]*)\.js(on)?)(\?(file=([^"|$]*)))?/;

const GIST_SCRIPT = new RegExp(`script.*src=${GIST_SRC.source}`);

export type GistDescription = { user: string; gistId: string; file?: string };

export function parseGist(
  html: string,
  srcOnly: boolean = false,
): GistDescription | null {
  const regex = srcOnly ? GIST_SRC : GIST_SCRIPT;
  const matches = regex.exec(html);
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
