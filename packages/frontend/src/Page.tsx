import { PropsWithChildren, StrictMode } from "react";
import { Footer, FooterProps } from "./Footer.js";
import { Header, HeaderProps } from "./Header.js";
import { LoadingBar } from "./LoadingBar.js";
import { FetchTracker } from "./FetchTracker.js";

export type PageProps = FooterProps & HeaderProps;

export function Page({
  title,
  children,
  ...other
}: PropsWithChildren<PageProps>) {
  return (
    <StrictMode>
      <FetchTracker>
        <LoadingBar />
        <div
          data-testid="page"
          className={`py-8 lg:py-16 px-6 md:px-16 lg:px-24`}
        >
          <Header title={title} date={other.date} tags={other.tags} />
          <div className={`lg:pl-32 mt-12`}>{children}</div>
          <Footer {...other} />
        </div>
      </FetchTracker>
    </StrictMode>
  );
}
