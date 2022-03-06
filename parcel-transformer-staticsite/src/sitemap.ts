import * as path from "path";
import { glob, isGlob, normalizeSeparators } from "@parcel/utils";
import type { FileSystem } from "@parcel/fs";
import type { MutableAsset } from "@parcel/types";
import { computeKey } from "./key-factory";

class Sitemap {
  private rules: string[] = [];
  private baseDir: string;

  constructor(baseDir: string, rules: string[]) {
    this.rules = rules;
    this.baseDir = baseDir;
  }

  getDependencies() {
    return this.rules.map((r) => {
      const { name, ext } = computeKey(r);
      return {
        key: name,
        ext,
        filePath: r,
        specifier: r.replace(this.baseDir, "."),
      };
    });
  }

  getCode() {
    return this.getDependencies()
      .map((d) => {
        if (d.ext === ".md") {
          return `/${d.key}/`;
        }
        const name = d.specifier.replace("./", "/");
        return name;
      })
      .join("\n");
  }
}

async function parseSitemapContent({
  content,
  filePath,
  fs,
}: {
  content: string;
  filePath: string;
  fs: FileSystem;
}) {
  const baseDir = path.dirname(filePath);

  const lines = content
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean)
    .map(async (l) => {
      const fullPath = path.resolve(baseDir, l);

      if (isGlob(l)) {
        const normalized = normalizeSeparators(fullPath);
        return await glob(normalized, fs, { onlyFiles: true });
      }

      return fullPath;
    });

  const all = await Promise.all(lines);
  return new Sitemap(baseDir, all.flat());
}

export const _parseSitemapContent = parseSitemapContent;

export async function parseSitemap(asset: MutableAsset, fs: FileSystem) {
  const content = await asset.getCode();
  return parseSitemapContent({ content, filePath: asset.filePath, fs });
}
