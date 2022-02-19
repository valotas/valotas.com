import { Transformer } from "@parcel/plugin";
import { parseMD } from "./md-parser";
import { renderToString } from "./render-to-string";

export default new Transformer({
  async loadConfig({ config }) {
    return config.getConfig(["package.json"], {});
  },

  async transform({ asset, logger, config }) {
    logger.info({ message: `conf: ${JSON.stringify(config)}` });

    const code = await asset.getCode();

    const parsed = parseMD(code);
    const htmlContent = await renderToString(parsed.raw);

    asset.type = "html";
    asset.setCode(htmlContent);

    return [asset];
  },
});
