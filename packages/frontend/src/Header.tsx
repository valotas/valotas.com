import { DateSpan } from "./DateSpan.js";
import { Icon, IconProps } from "./Icon.js";
import { createTitle } from "./title.js";
import { Anchor, Link } from "./links.js";

export interface HeaderProps {
  title?: string | null;
  date?: string;
  tags?: string[];
}

function LinkWithIcon({ href, ...iconProps }: IconProps & { href: string }) {
  return (
    <Anchor
      href={href}
      target="_blank"
      className={`block fill-gray-500 hover:fill-black`}
    >
      <Icon {...iconProps} />
    </Anchor>
  );
}

export function Header({ title, date, tags }: HeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center`}
      data-testid="header"
    >
      <div className={`mb-2 pr-4 md:mb-0 md:pr-6 lg:pr-12`}>
        <div className={`group relative`}>
          <Link noUnderline href="/" className={`flex no-underline`}>
            <div
              className={`george ${`h-12 w-12 lg:h-20 lg:w-20 rounded-full`}`}
            ></div>
          </Link>
          {tags && (
            <div
              className={`absolute left-0 invisible lg:group-hover:visible w-12 lg:w-20 pr-1 pb-2`}
            >
              <ul>
                {tags.map((tag) => (
                  <li key={tag}>
                    <Link className={`w-full`} href={`/tag/${tag}/`}>
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={`flex flex-col items-center md:items-start`}>
        <h1
          className={`text-black text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight`}
        >
          {createTitle(title)}
        </h1>
        <DateSpan iso={date} />
        <div className={`mt-3 lg:mt-4 flex justify-between w-40`}>
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
