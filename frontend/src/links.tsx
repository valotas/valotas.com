import React from "react";
import { PropsWithChildren } from "react";
import { tw } from "./twind";
import { Icon, IconProps } from "./Icon";

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

export type TextLinkProps = LinkProps & {
  icon: IconProps["name"];
  title: string;
  color?: string;
};

export function TextLink({
  icon,
  title,
  color = "gray-500",
  className,
  ...linkProps
}: TextLinkProps) {
  const colorClassName = tw`text-${color}`;
  const classNameWithColor = `${className || ""} ${colorClassName}`;

  return (
    <Link
      className={`inline-flex items-center ${classNameWithColor}`}
      {...linkProps}
    >
      <Icon name={icon} size="4" className={tw`fill-${color}`} />
      <span className={tw`pl-2`}>{title}</span>
    </Link>
  );
}
