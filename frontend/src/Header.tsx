import React from "react";
import { tw } from "./twind";
import { useHover } from "./hooks";
import { Icon, IconProps } from "./Icon";
import { createTitle } from "./title";
import { Link } from "./links";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  date?: string;
}

function LinkWithIcon({ href, ...iconProps }: IconProps & { href: string }) {
  const [ref, isHovered] = useHover<HTMLAnchorElement>();
  const fill = isHovered ? "fill-black" : "fill-gray-500";

  return (
    <a href={href} target="_blank" className={tw`block ${fill}`} ref={ref}>
      <Icon {...iconProps} />
    </a>
  );
}

export function Header({ title }: HeaderProps) {
  return (
    <div className={tw`flex flex-col md:flex-row items-center`}>
      <div className={tw`mb-2 pr-4 md:mb-0 md:pr-6 lg:pr-12`}>
        <Link
          noUnderline
          href="/"
          className={tw`flex items-center no-underline`}
        >
          <img
            src="https://avatars.githubusercontent.com/u/26611?v=4"
            className={tw`h-12 w-12 lg:h-20 lg:w-20 rounded-full`}
          />
        </Link>
      </div>
      <div>
        <h1>
          <a
            href="/"
            className={tw`block text-black no-underline font-bold text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight`}
          >
            {createTitle(title)}
          </a>
        </h1>
        <div
          className={tw`text-center md:text-left mt-3 lg:mt-4 flex justify-between lg:w-40`}
        >
          <LinkWithIcon href="https://github.com/valotas" name="github" />
          <LinkWithIcon
            href="https://www.linkedin.com/in/valotas"
            name="linkedin"
          />
          <LinkWithIcon href="https://twitter.com/valotas" name="twitter" />
          <LinkWithIcon
            href="https://www.instagram.com/george.valotas/"
            name="ig"
          />
        </div>
      </div>
    </div>
  );
}
