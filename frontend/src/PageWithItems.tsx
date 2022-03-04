import React from "react";
import { parseISO } from "date-fns/fp";
import { format } from "date-fns";
import { Page, PageProps } from "./Page";
import { tw } from "./twind";
import { Anchor, Link } from "./links";
import { MarkedContent } from "./marked/MarkedContent";

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
  const parsedDate = date ? parseISO(date) : undefined;
  const formatedDate = parsedDate ? format(parsedDate, "PPP") : undefined;

  return (
    <div className={tw`mt-10`}>
      <span
        className={tw`block text-gray-500 uppercase font-semibold text-xs tracking-wide mb-1`}
      >
        {formatedDate || " "}
      </span>
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
