import * as path from "path";
import * as through from "through2";
import { createArticle, Article } from "../content/Article";
import { MetaFile, isValidMetaFile } from "../content/MetaFile";
import { compareMoments } from "../utils";
import { GulpFile, Logger } from "./gulp-types";
import File = require("vinyl"); // how to use import File from 'vinyl'?
import * as gutil from "gulp-util";

export { parseMetaFile } from "./parseMetaFile";
export { adaptPaths } from "./adaptPaths";
export { wrapHtml } from "./wrapHtml";
export { addSitemap } from "./addSitemap";
export { addMetafiles } from "./addMetaFiles";
export { createLayoutHtml } from "./createLayoutHtml";

export function toArticle() {
  return through.obj(function (file: GulpFile, enc, callback) {
    const meta = file.meta;
    if (isValidMetaFile(meta) && meta.type === "article") {
      file.article = createArticle(meta);
    }
    callback(null, file);
  });
}

export function addIndex(logger: Logger = gutil) {
  let metas: MetaFile[] = [];
  let cwd;
  return through.obj(
    function (file, enc, callback) {
      const { article } = file;
      if (article) {
        cwd = file.cwd;
        metas.push(createDescriptionMetaFile(article));
      }
      callback(null, file);
    },
    function (callback) {
      metas = metas.sort(compareMoments);
      const indexPage = createFileWithName("index.html", cwd, metas);
      this.push(indexPage);
      logger.log("Addded index Vinyl", indexPage.path);
      callback();
    }
  );
}

function createFileWithName(
  name: string,
  cwd: string,
  meta: MetaFile | MetaFile[]
) {
  if (!cwd) {
    throw new Error(`Expected a truthy cwd. Got '${cwd}'`);
  }
  const file = new File({
    cwd: cwd,
    base: path.join(cwd, "src"),
    path: path.join(cwd, "src", name),
  }) as any;
  file.meta = meta;
  file.meta.path = "";
  return file;
}

function createDescriptionMetaFile(article: Article) {
  const meta = new MetaFile(article.meta);
  meta.raw = null;
  meta.description = article.description();
  return meta;
}
