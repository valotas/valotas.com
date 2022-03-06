import React from "react";
import { BlockquoteRendererProps } from "react-marked-renderer";
import { tw } from "../twind";

export function Blockquote({ children }: BlockquoteRendererProps) {
  return (
    <blockquote className={tw`pl-6 pt-1 pb-1 border-l-4 border-gray-300`}>
      {children}
    </blockquote>
  );
}
