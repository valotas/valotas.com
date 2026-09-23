import Markdown, { type MarkdownToJSX, RuleType } from "markdown-to-jsx";
import { CodeBlock } from "./CodeBlock.js";
import { Heading } from "./Heading.js";
import { isMarkdownScript, MarkdownScript } from "./MarkdownScript.js";
import { MarkedLink } from "./MarkedLink.js";

const options: MarkdownToJSX.Options = {
  forceBlock: true,
  // Keep raw <script> nodes so gist and Twitter embeds can be rewritten.
  tagfilter: false,
  renderRule(next, node, _render, state) {
    if (node.type === RuleType.codeBlock) {
      const code = node.text;
      return <CodeBlock key={state.key} lang={node.lang} code={code} />;
    }

    if (isMarkdownScript(node)) {
      return (
        <MarkdownScript
          key={state.key}
          tag={node.tag}
          type={node.type}
          attrs={node.attrs}
        />
      );
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
    a: { component: MarkedLink },
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
