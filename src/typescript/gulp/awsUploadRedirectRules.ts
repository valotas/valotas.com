import * as cp from 'child_process';
import * as moment from 'moment';
import { MetaFile } from '../content/MetaFile';
import promisify from './promisify';

// tslint:disable-next-line class-name
export class _RedirectRule {
  constructor(private file: MetaFile) { }

  isApplicable() {
    return !!(this.file && this.file.published && this.file.date);
  }

  path() {
    const datePrefix = this.file.moment().format('YYYY/MM');
    return `/${datePrefix}/${this.file.path}.html`;
  }

  redirectLocation() {
    return `/${this.file.path}/`;
  }
}

const HTTP_DATE_FORMAT = 'ddd, DD MMM YYYY HH:mm:ss';

// tslint:disable-next-line class-name
export class _Aws {
  private expires: string;
  private exec: (...args) => Promise<any>;

  constructor(private bucket: string, now = moment()) {
    this.expires = now
      .add(90, 'days')
      .format(HTTP_DATE_FORMAT) + ' GTM';
    this.exec = promisify(cp.exec);
  }

  putRule(rule: _RedirectRule) {
    return this.exec([
      'aws s3api put-object',
      // '--acl public-read',
      `--bucket "${this.bucket}"`,
      `--key "${rule.path()}"`,
      // '--body ""',
      // '--content-length 0',
      `--expires "${this.expires}"`,
      `--website-redirect-location "${rule.redirectLocation()}"`
    ].join(' '));
  }
}

export function readRedirectRules() {

}
