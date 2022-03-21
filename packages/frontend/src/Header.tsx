import React from "react";
import { DateSpan } from "./DateSpan";
import { tw } from "./twind";
import { Icon, IconProps } from "./Icon";
import { createTitle } from "./title";
import { Anchor, Link } from "./links";

export interface HeaderProps {
  title?: string | null;
  date?: string;
}

function LinkWithIcon({ href, ...iconProps }: IconProps & { href: string }) {
  return (
    <Anchor
      href={href}
      target="_blank"
      className={tw`block fill-gray-500 hover:fill-black`}
    >
      <Icon {...iconProps} />
    </Anchor>
  );
}

export function Header({ title, date }: HeaderProps) {
  return (
    <div
      className={tw`flex flex-col md:flex-row items-center`}
      data-testid="header"
    >
      <div className={tw`mb-2 pr-4 md:mb-0 md:pr-6 lg:pr-12`}>
        <Link noUnderline href="/" className={tw`flex no-underline`}>
          <div
            className={`george ${tw`h-12 w-12 lg:h-20 lg:w-20 rounded-full`}`}
          ></div>
        </Link>
      </div>
      <div className={tw`flex flex-col items-center md:items-start`}>
        <h1
          className={tw`text-black text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight`}
        >
          {createTitle(title)}
        </h1>
        <DateSpan iso={date} />
        <div className={tw`mt-3 lg:mt-4 flex justify-between w-40`}>
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
