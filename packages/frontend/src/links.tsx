import { MouseEvent, useCallback, PropsWithChildren } from "react";
import { Icon, IconProps } from "./Icon.js";
import { history } from "./History.js";

function computeHref(href: string) {
  if (!href.endsWith("/")) {
    href += "/";
  }
  return href;
}

export type AnchorProps = {
  href: string;
  title?: string;
  target?: "_blank" | "_self";
  className?: string;
};

export function Anchor({
  href,
  title,
  target,
  className,
  children,
}: PropsWithChildren<AnchorProps>) {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (href.startsWith("/")) {
        e.preventDefault();

        const finalHref = computeHref(href);
        fetch(`${finalHref}meta.json`)
          .then((resp) => resp.text())
          .then((payload) => {
            history().pushState(payload, title || document.title, finalHref);
          });
      }
    },
    [href, title],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      target={target || "_self"}
      className={className}
    >
      {children}
    </a>
  );
}

export type LinkProps = {
  href: string;
  target?: "_blank" | "_self";
  className?: string;
  noUnderline?: boolean;
};

export function Link({
  href,
  target,
  className,
  children,
  noUnderline,
}: PropsWithChildren<LinkProps>) {
  return (
    <Anchor
      href={href}
      target={target || "_self"}
      className={`${
        noUnderline
          ? ""
          : "border-b border-gray-300 hover:border-gray-500 leading-tight inline-block"
      } ${className || ""}`}
    >
      {children}
    </Anchor>
  );
}

const sizeToClassName = new Map<string, string>([
  ["gray-500", "text-gray-700"],
]);
const sizeToFillClassName = new Map<string, string>([
  ["gray-500", "fill-gray-700"],
]);

export type TextLinkProps = LinkProps & {
  icon: IconProps["name"];
  title: string;
  color?: "gray-500";
};

export function LinkWithIcon({
  icon,
  title,
  color = "gray-500",
  className,
  ...linkProps
}: TextLinkProps) {
  //TODO: fix this
  const colorClassName = sizeToClassName.get(color);
  const classNameWithColor = `${className || ""} ${colorClassName}`;

  return (
    <Link
      className={`inline-flex items-center ${classNameWithColor}`}
      {...linkProps}
    >
      <Icon name={icon} size="4" className={sizeToFillClassName.get(color)} />
      <span className={`pl-2`}>{title}</span>
    </Link>
  );
}
