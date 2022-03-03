import type { MutableAsset, PluginLogger, BundleBehavior } from "@parcel/types";
import { parse } from "@valotas/valotas.com-frontent";
import { render, renderMany } from "@valotas/valotas.com-frontent/dist/render";
import { btoa } from "./base64";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer";
import { createLazyDependency } from "./dep";

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
  if (asset.meta.publishedFiles) {
    const items = (asset.meta.publishedFiles as any).map((f: any) => ({
      ...f,
      href: `/${f.key}/`,
    }));

    const renderProps = { items, pkgVersion };
    const rendered = await renderMany({
      logger: {
        log: (message: string) => logger.info({ message }),
      },
      ...renderProps,
    });

    return { ...rendered, ...renderProps };
  }

  const code = await asset.getCode();

  const { draft, raw, title } = parse(code);
  if (draft) {
    return null;
  }

  const renderProps = {
    bodyMarkdown: raw,
    title,
    pkgVersion,
  };
  const rendered = await render({
    logger: {
      log: (message: string) => logger.info({ message }),
    },
    ...renderProps,
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

  const base64 = btoa(JSON.stringify(renderProps));

  asset.meta.base64 = base64;
  asset.meta.title = "title" in renderProps ? renderProps.title : "";
  asset.meta.styles = styles;

  asset.setCode(body);
  asset.type = "htmlbody";

  const meta = {
    type: "meta",
    uniqueKey: `${asset.id}-meta`,
    meta: asset.meta,
    content: base64,
  };

  asset.addDependency(createLazyDependency(meta.uniqueKey));

  return [asset, meta];
};
