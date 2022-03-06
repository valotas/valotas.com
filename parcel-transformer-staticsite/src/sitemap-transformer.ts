import * as path from "path";
import type { FileSystem } from "@parcel/fs";
import { parse } from "@valotas/valotas.com-frontent";
import { parseSitemap } from "./sitemap";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer";
import { sortByDate } from "./date-sorter";
import { createParallelDependency } from "./dep";
import { computeKey } from "./key-factory";

async function parseMD(fs: FileSystem, filePath: string) {
  if (path.extname(filePath) !== ".md") {
    return null;
  }
  const buffer = await fs.readFile(filePath);
  const raw = buffer.toString("utf8");
  return parse(raw);
}

export const transformSitemap: StaticSiteTransformerFn = async ({
  asset,
  options,
}) => {
  const sitemap = await parseSitemap(asset, options.inputFS);

  const mdFiles: Array<
    Omit<ReturnType<typeof parse>, "raw"> & { key: string }
  > = [];

  for (const dep of sitemap.getDependencies()) {
    const md = await parseMD(options.inputFS, dep.filePath);

    if (md?.draft) {
      continue;
    }

    if (md) {
      const { raw: _, ...rest } = md;
      mdFiles.push({ ...rest, key: dep.key });
    }

    asset.addDependency(createParallelDependency(dep.specifier));
  }

  asset.setCode(sitemap.getCode());
  asset.meta.key = computeKey(asset.filePath).name;

  const indexFile = {
    type: "md",
    uniqueKey: `${asset.id}-index`,
    content: "",
    meta: {
      key: "index",
      publishedFiles: sortByDate(mdFiles),
    },
  };

  asset.addDependency(createParallelDependency(indexFile.uniqueKey));

  return [asset, indexFile];
};
