import { createElement } from "react";
// @ts-expect-error TS2305
import { HeadingRendererProps } from "react-marked-renderer";

type HeadingWeight = "h1" | "h2" | "h3" | "h4";
const depths = [1, 2, 3, 4];

function getAllowedDepth(d: number) {
  const found = depths.indexOf(d);
  if (found >= 0) {
    return d;
  }
  return depths[depths.length - 1];
}

const styles = {
  h1: `text-2xl font-extrabold text-black leading-tight mt-6`,
  h2: `text-2xl font-extrabold text-black leading-tight mt-6`,
  h3: `font-extrabold text-black leading-tight mt-4`,
  h4: `text-black leading-tight mt-4`,
};

export function Heading(props: HeadingRendererProps) {
  const depth = getAllowedDepth(props.depth);
  const component = `h${depth}` as HeadingWeight;
  const style = styles[component];

  return createElement(component, { className: style }, props.children);
}
