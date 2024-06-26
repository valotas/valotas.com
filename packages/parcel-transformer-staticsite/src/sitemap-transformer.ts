import * as path from "path";
import type { FileSystem } from "@parcel/fs";
import type { TransformerResult } from "@parcel/types";
import { parse } from "@valotas/valotas-frontend";
import { parseSitemap } from "./sitemap.js";
import { StaticSiteTransformerFn } from "./StaticSiteTransformer.js";
import { sortByDate } from "./date-sorter.js";
import { createParallelDependency } from "./dep.js";
import { computeKey } from "./key-factory.js";

type MD = ReturnType<typeof parse> & { key: string; specifier: string };
type MDMeta = Omit<MD, "raw" | "specifier">;
type MDAsset = TransformerResult & { uniqueKey: string };

async function parseMD(fs: FileSystem, filePath: string) {
  if (path.extname(filePath) !== ".md") {
    return null;
  }
  const buffer = await fs.readFile(filePath);
  const raw = buffer.toString("utf8");
  const result = parse(raw);
  return { ...result, raw };
}

async function readMDFiles(
  fs: FileSystem,
  dependencies: Array<{ filePath: string; key: string; specifier: string }>,
): Promise<MD[]> {
  const mdFiles: MD[] = [];

  for (const dep of dependencies) {
    const md = await parseMD(fs, dep.filePath);

    if (md?.draft) {
      continue;
    }

    if (md && !md.skipIndex) {
      mdFiles.push({ ...md, key: dep.key, specifier: dep.specifier });
    }
  }

  return mdFiles;
}

function groupByTag(files: MDMeta[]): Map<string, MDMeta[]> {
  return (files as any[]).reduce((map, md) => {
    for (const tag of md.tags) {
      if (tag.length) {
        if (map.has(tag)) {
          map.get(tag)?.push(md);
        } else {
          map.set(tag, [md]);
        }
      }
    }

    return map;
  }, new Map<string, MDMeta[]>());
}

export function _getAllTags(groups: Map<string, any>): string[] {
  return Array.from(groups.keys()).sort((a, b) =>
    a > b ? 1 : a == b ? 0 : -1,
  );
}

export const transformSitemap: StaticSiteTransformerFn = async ({
  asset,
  options,
  logger,
}) => {
  const sitemap = await parseSitemap(asset, options.inputFS);
  const { md, other } = sitemap.getDependenciesGroupedByExt();

  logger.info({ message: `Found ${other.length} non md files` });

  other.forEach((dep) => {
    asset.addDependency(createParallelDependency(dep.specifier));
  });

  const mdFiles: MD[] = await readMDFiles(options.inputFS, md);
  const mdMetas: MDMeta[] = mdFiles.map(({ raw: _, ...rest }) => ({
    ...rest,
  }));

  const mdGroupByTags: Map<string, MDMeta[]> = groupByTag(mdMetas);
  const tags = _getAllTags(mdGroupByTags);

  logger.info({
    message: `Found ${mdMetas.length} md files with ${tags.length} tags`,
  });

  const indexFile = {
    type: "md",
    uniqueKey: `${asset.id}-index`,
    content: "",
    meta: {
      key: "index",
      publishedFiles: sortByDate(mdMetas),
      tags,
    },
  };

  const mdAssets: MDAsset[] = mdFiles.map((md) => ({
    type: "md",
    uniqueKey: md.specifier,
    content: md.raw,
    meta: {
      key: md.key,
      tags,
    },
  }));

  asset.setCode(sitemap.getCode());
  asset.meta.key = computeKey(asset.filePath).name;

  const groupDependencies = Array.from(mdGroupByTags).map(([group, files]) => {
    return {
      type: "md",
      uniqueKey: `${asset.id}-tag-${group}`,
      content: "",
      meta: {
        key: `tag/${group}`,
        publishedFiles: sortByDate(files),
        tags,
      },
    };
  });

  const additionalAssets = [indexFile, ...groupDependencies, ...mdAssets];

  additionalAssets.forEach((dep) =>
    asset.addDependency(createParallelDependency(dep.uniqueKey)),
  );

  return [asset, ...additionalAssets];
};
