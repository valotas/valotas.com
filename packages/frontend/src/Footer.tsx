import React from "react";
import { Icon } from "./Icon";
import { Link } from "./links";
import { tw } from "./twind";

export interface FooterProps {
  pkgVersion?: string;
}

export function Footer({ pkgVersion }: FooterProps) {
  return (
    <div
      className={tw`flex flex-col mt-12 text-gray-500 `}
      data-testid="footer"
    >
      <div className={tw`md:pl-16 md:ml-2 lg:pl-32 lg:text-center`}>
        valotas.com <strong>v{pkgVersion || ""}</strong> &copy; Γιώργος
        Βαλοτάσιος - CSS inspired by{` `}
        <Link href="https://adamwathan.me/" target="_blank">
          Adam Wathan's
        </Link>
        {` `}
        blog
      </div>
      <div className={tw`flex flex-col md:flex-row mt-2`}>
        <div className={tw`pr-4 md:pr-6 lg:pr-12 flex items-center`}>
          <div className={tw`w-10 m-auto md:w-12 lg:w-20`}>
            <Icon name="asterisk" className={tw`fill-gray-500`} />
          </div>
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
