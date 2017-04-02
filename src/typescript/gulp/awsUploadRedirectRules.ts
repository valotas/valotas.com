import { MetaFile } from '../content/MetaFile';

// tslint:disable-next-line class-name
export class _RedirectRule {
  constructor(private file: MetaFile) {}

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

export function readRedirectRules() {

}
