import React from "react";
import { LinkRendererProps } from "react-marked-renderer";
import { Link } from "../links.js";

export function MarkedLink({ children, href }: LinkRendererProps) {
  return <Link href={href}>{children}</Link>;
}
