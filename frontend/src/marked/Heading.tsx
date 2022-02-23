import { createElement } from "react";
import { HeadingRendererProps } from "react-marked-renderer";
import { tw } from "../twind";

const depths = [1, 2, 3, 4, 5, 6];

function getAllowedDepth(d: number) {
  const found = depths.indexOf(d);
  if (found >= 0) {
    return d;
  }
  return depths[depths.length - 1];
}

export function Heading(props: HeadingRendererProps) {
  const depth = getAllowedDepth(props.depth);
  const component = `h${depth}`;

  const className = tw`text-2xl font-extrabold text-black leading-tight mt-1 mb-6`;

  return createElement(component, { className }, props.children);
}
