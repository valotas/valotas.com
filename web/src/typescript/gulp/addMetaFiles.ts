import * as through from "through2";
import * as gutil from "gulp-util";
import Vinyl = require("vinyl"); // how to use import File from 'vinyl'?
import * as path from "path";
import { Logger } from "./gulp-types";
import { MetaFile } from "../content/MetaFile";

export function addMetafiles(logger: Logger = gutil) {
  return through.obj(function (file, enc, callback) {
    const meta = file.meta as MetaFile;
    if (meta) {
      const metaPath = path.join(file.base, meta.path, "meta.json");
      const metaFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: metaPath,
        contents: new Buffer(JSON.stringify(meta), enc),
      });
      this.push(metaFile);
      logger.log("Adding metadata vinyl", metaPath);
    }
    callback(null, file);
  });
}
