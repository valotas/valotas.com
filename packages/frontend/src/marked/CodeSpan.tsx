import React from "react";
// @ts-expect-error TS2305
import { CodeSpanRendererProps } from "react-marked-renderer";
import { tw } from "../twind.js";

export function CodeSpan({ children }: CodeSpanRendererProps) {
  return <code className={tw`bg-gray-200 rounded px-1`}>{children}</code>;
}
