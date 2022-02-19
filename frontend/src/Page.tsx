import { h } from "preact";
import type { FooterProps } from "./Footer";
import { Footer } from "./Footer.js";

export type PageProps = FooterProps;

export function Page(props: PageProps) {
  return (
    <div data-testid="page">
      hi!
      <Footer {...props} />
    </div>
  );
}
