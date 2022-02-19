import { h } from "preact";
import { MetaFileData } from "../types";
import { createComponentTree } from "./marked/createComponentTree";

interface MarkedComponentProps {
  meta?: MetaFileData;
  markFirstLetter?: boolean;
  children?: any;
}

export function MarkedComponent(props: MarkedComponentProps) {
  const { meta, markFirstLetter } = props;
  const firstLetterSpan = markFirstLetter === false ? false : true;
  const input = meta ? meta.raw : (props.children[0] as string);
  return createComponentTree(input, { firstLetterSpan: firstLetterSpan });
}
