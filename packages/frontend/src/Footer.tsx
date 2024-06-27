import React from "react";
import { Link } from "./links.js";
import { tw } from "./twind.js";
import { name } from "./title.js";

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
        valotas.com <strong>v{pkgVersion || ""}</strong> &copy; {name()} - CSS
        inspired by{` `}
        <Link href="https://adamwathan.me/" target="_blank">
          Adam Wathan's
        </Link>
        {` `}
        blog
      </div>
    </div>
  );
}
