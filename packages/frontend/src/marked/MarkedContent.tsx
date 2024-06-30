import Markdown, { type MarkdownToJSX } from "markdown-to-jsx";
import { CodeBlock } from "./CodeBlock.js";
import { MarkdownScript, isMarkdownScript } from "./MarkdownScript.js";
import { Heading } from "./Heading.js";

const codeBlock = "3";

const options: MarkdownToJSX.Options = {
  forceBlock: true,
  renderRule(next, node, _render, state) {
    if (node.type === codeBlock) {
      const code = node.text;
      return <CodeBlock key={state.key} lang={node.lang} code={code} />;
    }

    if (isMarkdownScript(node)) {
      return <MarkdownScript key={state.key} {...node} />;
    }

    try {
      return next();
    } catch (e) {
      if (e instanceof Error) {
        e.message = `${e.message}: while rendering node: ${JSON.stringify(node)}`;
      }
      throw e;
    }
  },
  overrides: {
    ul: {
      component: "ul",
      props: { className: "pl-6 list-disc" },
    },
    ol: {
      component: "ol",
      props: { className: "pl-6 list-decimal" },
    },
    code: {
      component: "code",
      props: { className: "bg-gray-200 rounded px-1" },
    },
    h1: { component: Heading, props: { depth: 1 } },
    h2: { component: Heading, props: { depth: 2 } },
    h3: { component: Heading, props: { depth: 3 } },
    h4: { component: Heading, props: { depth: 4 } },
  },
};

export type MarkedContentProps = { raw: string };

export function MarkedContent({ raw }: MarkedContentProps) {
  return (
    <div data-testid="marked">
      <Markdown options={options}>{raw}</Markdown>
    </div>
  );
}
