import * as moment from "moment";
import { MetaFileData } from "../types";
import { MetaFile } from "./MetaFile";

export interface Article {
  title: string;
  key: string;
  meta: MetaFileData;
  moment(): moment.Moment;
  date(format?: string): string;
  description(): string;
  hasTweets(): boolean;
}

class ArticleImpl implements Article {
  title: string;
  key: string;

  constructor(public meta: MetaFile) {
    this.key = meta.path;
    this.title = meta.title;
  }

  moment(): moment.Moment {
    return this.meta.moment();
  }

  date(format?: string): string {
    return this.moment().format(format || "DD/MM/YYYY");
  }

  description(): string {
    const { description, raw } = this.meta;
    return description || raw.substr(0, raw.indexOf("\n#")).trim();
  }

  hasTweets() {
    return this.meta.raw.indexOf('"twitter-tweet"') > 0;
  }
}

export function createArticle(meta: MetaFile): Article {
  return new ArticleImpl(meta);
}
