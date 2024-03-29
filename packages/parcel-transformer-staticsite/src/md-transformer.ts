import type { MutableAsset, PluginLogger } from "@parcel/types";
import { parse } from "@valotas/valotas.com-frontent";
import { render } from "@valotas/valotas.com-frontent/dist/render";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer";
import { createLazyDependency } from "./dep";
import { computeKey } from "./key-factory";

export type MdTrasformerConfig = {
  pkgVersion: string;
  defaultTemplate?: string;
};

async function renderBodyAndHead({
  asset,
  logger,
  config: { pkgVersion },
}: {
  asset: MutableAsset;
  logger: PluginLogger;
  config: MdTrasformerConfig;
}) {
  const tags = Array.isArray(asset.meta.tags)
    ? (asset.meta.tags as string[])
    : [];

  if (asset.meta.publishedFiles) {
    const items = (asset.meta.publishedFiles as any).map((f: any) => ({
      ...f,
      href: `/${f.key}/`,
    }));

    const renderProps = { items, pkgVersion, tags };
    const rendered = await render({
      logger: {
        log: (message: string) => logger.info({ message }),
      },
      props: renderProps,
    });

    return { ...rendered, ...renderProps };
  }

  const code = await asset.getCode();

  const { draft, raw, title, date } = parse(code);
  if (draft) {
    return null;
  }

  const renderProps = {
    bodyMarkdown: raw,
    title,
    pkgVersion,
    date: date || undefined,
    tags,
  };
  const rendered = await render({
    logger: {
      log: (message: string) => logger.info({ message }),
    },
    props: renderProps,
  });
  return { ...rendered, ...renderProps };
}

export const transformMd: StaticSiteTransformerFn = async ({
  asset,
  config,
  logger,
}) => {
  const page = await renderBodyAndHead({
    asset,
    logger,
    config,
  });

  if (!page) {
    logger.info({ message: `Skipping: ${asset.filePath}` });
    return [];
  }

  const { body, styles, ...renderProps } = page;

  const paylod = JSON.stringify(renderProps);

  asset.meta.payload = paylod;
  asset.meta.title = "title" in renderProps ? renderProps.title : "";
  asset.meta.styles = styles;
  asset.meta.key = asset.meta.key || computeKey(asset.filePath).name;
  asset.meta.date = "date" in renderProps ? renderProps.date : undefined;

  asset.setCode(body);
  asset.type = "htmlbody";

  const meta = {
    type: "meta",
    uniqueKey: `${asset.id}-meta`,
    meta: asset.meta,
    content: paylod,
  };

  asset.addDependency(createLazyDependency(meta.uniqueKey));

  return [asset, meta];
};
