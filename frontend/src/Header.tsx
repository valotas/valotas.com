import React from "react";
import { tw } from "./twind";
import { useHover } from "./hooks";
import { Icon, IconProps } from "./Icon";
import { createTitle } from "./title";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  date?: string;
}

function LinkWithIcon({ href, ...iconProps }: IconProps & { href: string }) {
  const [ref, isHovered] = useHover<HTMLAnchorElement>();
  const fill = isHovered ? "fill-black" : "fill-gray-500";

  return (
    <a href={href} target="_blank" className={tw`pr-4  ${fill}`} ref={ref}>
      <Icon {...iconProps} />
    </a>
  );
}

export function Header({ title, date, subtitle }: HeaderProps) {
  return (
    <div className={tw`relative z-20 flex justify-between items-center`}>
      <div className={tw`flex md:block lg:flex items-center max-w-full`}>
        <div
          className={tw`mb-0 md:mb-4 lg:mb-0 flex flex-no-shrink pr-4 md:pr-6 lg:pr-12`}
        >
          <a href="/" className={tw`flex items-center no-underline`}>
            <img
              src="https://avatars.githubusercontent.com/u/26611?v=4"
              className={tw`h-10 w-10 md:h-12 md:w-12 lg:h-20 lg:w-20 rounded-full`}
            />
          </a>
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
            className={tw`hidden md:flex mt-3 lg:mt-4 uppercase tracking-wide text-xs`}
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
        <h4 className="signature-row">
          {subtitle || ""} <Date date={date} />
        </h4>
      </div>
    </div>
  );
}

function Date({ date }: Pick<HeaderProps, "date">) {
  if (!date) {
    return null;
  }
  return (
    <span className="date label">
      &nbsp;
      {date}
    </span>
  );
}
