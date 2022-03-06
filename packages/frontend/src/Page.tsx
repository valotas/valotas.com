import React, { PropsWithChildren, StrictMode } from "react";
import { tw } from "./twind";
import { Footer, FooterProps } from "./Footer";
import { Header, HeaderProps } from "./Header";

export type PageProps = FooterProps & HeaderProps;

export function Page({
  title,
  children,
  ...other
}: PropsWithChildren<PageProps>) {
  return (
    <StrictMode>
      <div
        data-testid="page"
        className={tw`py-8 lg:py-16 px-6 md:px-16 lg:px-24`}
      >
        <Header title={title} date={other.date} />
        <div className={tw`lg:pl-32 mt-12`}>{children}</div>
        <Footer {...other} />
      </div>
    </StrictMode>
  );
}
