import type { MutableAsset, PluginLogger, BundleBehavior } from "@parcel/types";
import { Transformer } from "@parcel/plugin";
import { compileFile } from "pug";
import * as path from "path";
import { parse, createTitle } from "@valotas/valotas.com-frontent";
import { render, renderMany } from "@valotas/valotas.com-frontent/dist/render";
import { btoa } from "./base64";

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

    const rendered = await renderMany({
      pkgVersion,
      logger: {
        log: (message: string) => logger.info({ message }),
      },
      items,
    });

    return { ...rendered, title: null };
  }

  const code = await asset.getCode();

  const { draft, raw, title } = parse(code);
  if (draft) {
    return null;
  }

  const rendered = await render({
    bodyMarkdown: raw,
    title,
    pkgVersion,
    logger: {
      log: (message: string) => logger.info({ message }),
    },
  });
  return { ...rendered, title };
}

export default new Transformer<MdTrasformerConfig>({
  async loadConfig({ config }) {
    const [pkg, conf] = await Promise.all([
      config.getPackage(),
      config.getConfig(["static-site.json"], {}),
    ]);

    if (!pkg) {
      throw new Error("oups");
    }

    const { version } = pkg;

    if (!conf || !conf.filePath) {
      throw new Error("Could not load static-site.json");
    }

    const { defaultTemplate } = conf?.contents as any;

    const defaultTemplateFilePath = defaultTemplate
      ? path.join(path.dirname(conf?.filePath), defaultTemplate)
      : "";

    if (defaultTemplateFilePath) {
      config.invalidateOnFileChange(defaultTemplateFilePath);
    }

    config.addDevDependency({
      specifier: "@valotas/valotas.com-frontent/dist/render",
      resolveFrom: defaultTemplateFilePath,
    });

    return {
      pkgVersion: version,
      defaultTemplate: defaultTemplateFilePath,
    };
  },

  async transform({ asset, config, logger }) {
    const page = await renderBodyAndHead({
      asset,
      logger,
      config,
    });

    if (!page) {
      logger.info({ message: `Skipping: ${asset.filePath}` });
      return [];
    }

    const { defaultTemplate } = config;
    if (!defaultTemplate) {
      throw new Error(`No temlate defined for ${asset.filePath}`);
    }

    asset.invalidateOnFileChange(defaultTemplate);

    asset.meta.templateSource = defaultTemplate;
    const renderHtml = compileFile(defaultTemplate);
    const html = renderHtml({
      title: createTitle(page.title),
      body: page.body,
      base64body: btoa(page.body),
      styles: page.styles,
    });

    if (html.indexOf(page.styles) < 0) {
      logger.warn({
        message: `Styles have not been rendered for ${asset.filePath}`,
      });
    }

    asset.type = "html";
    asset.setCode(html);

    const meta = {
      type: "meta",
      uniqueKey: `${asset.id}-meta`,
      meta: asset.meta,
      content: JSON.stringify({ aa: 1, base64body: btoa(page.body) }),
    };

    asset.addDependency({
      specifier: meta.uniqueKey,
      specifierType: "commonjs",
      priority: "lazy",
    });

    return [asset, meta];
  },
});
