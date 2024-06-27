import React from "react";
import { DateSpan } from "./DateSpan.js";
import { Page, PageProps } from "./Page.js";
import { tw } from "./twind.js";
import { Anchor, Link } from "./links.js";
import { MarkedContent } from "./marked/MarkedContent.js";

export type PageItem = {
  date?: string;
  title: string;
  href: string;
  description?: string;
};

function PageItemPresenter({
  item: { date, title, href, description },
}: {
  item: PageItem;
}) {
  return (
    <div className={tw`mt-10`}>
      <DateSpan iso={date} />
      <div>
        <Anchor
          href={href}
          title={title}
          className={tw`text-lg text-black font-bold no-underline hover:underline`}
        >
          {title}
        </Anchor>
      </div>
      {description && <MarkedContent raw={description} />}
      <Link
        href={href}
        noUnderline
        className={tw`text-sm text-gray-500 hover:text-black no-underline hover:underline`}
      >
        More →
      </Link>
    </div>
  );
}

export type PageWithListProps = PageProps & { items: PageItem[] };

export function PageWithItems({ items = [], ...pageProps }: PageWithListProps) {
  return (
    <Page {...pageProps}>
      {items.length == 0 && <h3>Nothing to show</h3>}
      {items.map((item) => (
        <PageItemPresenter key={item.href} item={item} />
      ))}
    </Page>
  );
}
