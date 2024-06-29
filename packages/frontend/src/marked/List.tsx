import { createElement } from "react";
// @ts-expect-error TS2305
import { ListRendererProps } from "react-marked-renderer";

export function List({ children, ordered }: ListRendererProps) {
  const Component = ordered ? "ol" : "ul";
  const type = ordered ? "list-decimal" : "list-disc";
  const className = `pl-6 ${type}`;
  return createElement(Component, { className }, children);
}
