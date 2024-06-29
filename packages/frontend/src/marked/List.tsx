import { createElement } from "react";
// @ts-expect-error TS2305
import { ListRendererProps } from "react-marked-renderer";
import { tw } from "../twind.js";

export function List({ children, ordered }: ListRendererProps) {
  const Component = ordered ? "ol" : "ul";
  const type = ordered ? "list-decimal" : "list-disc";
  const className = tw("pl-6", type);
  return createElement(Component, { className }, children);
}
