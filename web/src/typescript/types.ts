/* eslint-disable no-undef */
import { Moment } from 'moment';

export type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface Fetcher {
  fetch: Fetch;
}

export type MetaFileType = 'article' | 'error';

export interface MetaFileData {
  title: string;
  path: string;
  type: MetaFileType;

  raw?: string;
  date?: string;
  published?: boolean;
  description?: string;
  gists?: GistContent[];
}

export interface GistDescription {
  gistId: string;
  file: string;
  user?: string;
}

export interface GistContent extends GistDescription {
  content?: string;
}
