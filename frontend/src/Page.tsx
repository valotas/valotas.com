import React from "react";
import { tw } from "./twind";
import type { FooterProps } from "./Footer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MarkedContent } from "./marked/MarkedContent";

export type PageProps = FooterProps & { bodyMarkdown?: string; title?: string };

export function Page({ bodyMarkdown, title, ...other }: PageProps) {
  return (
    <div
      data-testid="page"
      className={tw`py-8 lg:py-16 px-6 md:px-16 lg:px-24`}
    >
      <Header title={title} />
      <div className={tw`lg:pl-32 mt-12`}>
        {bodyMarkdown && <MarkedContent raw={bodyMarkdown} />}
      </div>
      <Footer {...other} />
    </div>
  );
}
