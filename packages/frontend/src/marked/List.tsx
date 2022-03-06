import { createElement } from "react";
import { ListRendererProps } from "react-marked-renderer";
import { tw } from "../twind";

export function List({ children, ordered }: ListRendererProps) {
  const Component = ordered ? "ol" : "ul";
  const type = ordered ? "list-decimal" : "list-disc";
  const className = tw("pl-6", type);
  return createElement(Component, { className }, children);
}
