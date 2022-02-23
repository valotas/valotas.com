import React from "react";
import { Icon } from "./Icon";
import { Link } from "./Link";
import { tw } from "./twind";

export interface FooterProps {
  pkgName?: string;
  pkgVersion?: string;
}

export function Footer({ pkgVersion }: FooterProps) {
  return (
    <div
      className={tw`mt-12 text-gray-500 flex justify-between items-center`}
      data-testid="footer"
    >
      <div
        className={tw`pr-4 md:pr-6 lg:pr-12 flex justify-between items-center`}
      >
        <div className={tw`w-10 md:w-12 lg:w-20`}>
          <Icon name="asterisk" className={tw`fill-gray-500  m-auto`} />
        </div>
      </div>

      <div>
        <div>
          valotas.com <strong>v{pkgVersion || ""}</strong> &copy; Γιώργος
          Βαλοτάσιος - CSS inspired by{` `}
          <Link href="https://adamwathan.me/" target="_blank">
            Adam Wathan's
          </Link>
          {` `}
          blog
        </div>

        <div>
          The greek name "
          <strong>
            <em>Γιώργος</em>
          </strong>
          " is also know as Yoryos, Georgios or just George which seems to be
          easier to most english speaking people. If you are trying to find out
          what Βαλοτασιος means, just think of it as Valotasios and you should
          be fine.
        </div>
      </div>
    </div>
  );
}
