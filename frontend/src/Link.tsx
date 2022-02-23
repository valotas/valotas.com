import React from "react";
import { PropsWithChildren } from "react";
import { tw } from "./twind";

export type LinkProps = {
  href: string;
  target?: "_blank";
  className?: string;
};

export function Link({
  href,
  target,
  className,
  children,
}: PropsWithChildren<LinkProps>) {
  return (
    <a
      href={href}
      target={target || "_blank"}
      className={tw`border-b-1 border-gray-300 hover:border-gray-500 ${className}`}
    >
      {children}
    </a>
  );
}
