import type { Token } from "./prism.js";

export type TokenRendererProps = {
  tokens: (string | Token)[];
};

export function TokenRenderer({ tokens }: TokenRendererProps) {
  return <>{tokens.map((token, i) => renderToken(token, i))}</>;
}

function renderToken(token: string | Token, key: number): JSX.Element | string {
  if (typeof token === "string") {
    return token;
  }

  const className = `token ${token.type}`;

  if (typeof token.content === "string") {
    return (
      <span key={key} className={className}>
        {token.content}
      </span>
    );
  }

  if (Array.isArray(token.content)) {
    return (
      <span key={key} className={className}>
        {token.content.map((t, i) => renderToken(t, i))}
      </span>
    );
  }

  // token.content could also be a Token object
  return (
    <span key={key} className={className}>
      {renderToken(token.content as Token, 0)}
    </span>
  );
}
