import * as cp from "child_process";
import * as fs from "fs";
import * as moment from "moment";
import * as ProgressBar from "progress";
import { MetaFile } from "../content/MetaFile";
import promisify from "./promisify";

export class _RedirectRule {
  constructor(private file: MetaFile) {}

  isApplicable() {
    return !!(this.file && this.file.published && this.file.date);
  }

  path() {
    const datePrefix = this.file.moment().format("YYYY/MM");
    return `${datePrefix}/${this.file.path}.html`;
  }

  redirectLocation() {
    return `https://valotas.com/${this.file.path}/`;
  }

  toString() {
    return `RedirectRule(${this.path()} => ${this.redirectLocation()})`;
  }
}

const HTTP_DATE_FORMAT = "ddd, DD MMM YYYY HH:mm:ss";

export class _Aws {
  private expires: string;
  private exec: (...args) => Promise<any>;

  constructor(private bucket: string, now = moment()) {
    this.expires = now.add(90, "days").format(HTTP_DATE_FORMAT) + " GTM";
    this.exec = promisify(cp.exec);
  }

  putRule(rule: _RedirectRule) {
    const cmd = [
      "aws s3api put-object",
      "--acl public-read",
      `--bucket "${this.bucket}"`,
      `--key "${rule.path()}"`,
      // '--body ""',
      // '--content-length 0',
      `--expires "${this.expires}"`,
      `--website-redirect-location "${rule.redirectLocation()}"`,
    ].join(" ");
    return this.exec(cmd);
  }
}

export function readRedirectRules(): Promise<_RedirectRule[]> {
  const readFile = promisify(fs.readFile);
  return readFile("./build/meta.json")
    .then((meta) => {
      let data;
      if (meta instanceof Buffer) {
        data = meta.toString("utf8");
      }
      return JSON.parse(data);
    })
    .then((meta) => meta.map((m) => MetaFile.fromData(m)))
    .then((meta) => meta.map((m) => new _RedirectRule(m)));
}

const shouldExecute = process.argv.find((arg) => arg.indexOf(__filename) >= 0);
if (shouldExecute) {
  readRedirectRules()
    .then((rules) => {
      const aws = new _Aws("valotas.com");
      const bar = new ProgressBar(
        `uploading rules [:bar] (:current/:total), eta: :etas`,
        {
          total: rules.length,
        }
      );
      rules.forEach((r) => {
        aws.putRule(r).then(() => bar.tick());
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
}
