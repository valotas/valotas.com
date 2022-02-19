import * as through from "through2";
import File = require("vinyl"); // how to use import File from 'vinyl'?
import * as path from "path";

export function addSitemap() {
  const sitemap: string[] = [];
  let cwd;
  let enc;
  return through.obj(
    function (file, fileEnc, callback) {
      const meta = file.meta;
      if (meta) {
        cwd = file.cwd;
        enc = fileEnc;
        sitemap.push(createSitemapEntry(meta));
      }
      callback(null, file);
    },
    function (callback) {
      const file = new File({
        cwd: cwd,
        base: path.join(cwd, "src"),
        path: path.join(cwd, "src", "sitemap.txt"),
        contents: new Buffer(sitemap.join("\n"), enc),
      }) as any;
      this.push(file);
      callback();
    }
  );
}

function createSitemapEntry(meta) {
  let entry = "http://valotas.com/" + meta.path;
  if (entry.lastIndexOf("/") !== entry.length - 1) {
    entry += "/";
  }
  return entry;
}
