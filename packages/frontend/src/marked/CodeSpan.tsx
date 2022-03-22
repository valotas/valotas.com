import React from "react";
import { CodeSpanRendererProps } from "react-marked-renderer";
import { tw } from "../twind";

export function CodeSpan({ children }: CodeSpanRendererProps) {
  return <code className={tw`bg-gray-200 rounded px-1`}>{children}</code>;
}
