import { DateSpan } from "./DateSpan";
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
