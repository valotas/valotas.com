interface Article {
  title: string;
  key: string;
  meta: MetaFileData;
  moment(): moment.Moment;
  date(format?: string): string;
  description(): string;
  hasTweets(): boolean;
}

type MetaFileType = 'article' | 'error';

interface MetaFileData {
  title: string;
  path: string;
  type: MetaFileType;

  raw?: string;
  date?: string;
  published?: boolean;
  description?: string;
  gists?: GistContent[];
}

interface GistDescription {
  gistId: string;
  file: string;
  user?: string;
}

interface GistContent extends GistDescription {
  content?: string;
}
