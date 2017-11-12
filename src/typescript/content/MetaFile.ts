import * as moment from 'moment';
import * as ex from '../exceptions';
import { MetaFileData, MetaFileType, GistContent } from '../types';
import { isArray } from '../utils';

const DASHES = /\n?---/;
const NL_SPLIT = /\n/;
const KV_SPLIT = /\n|:/;
const INPUT_FORMATS = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD'];

export class MetaFile implements MetaFileData {
  title: string;
  path: string;
  raw: string;
  type: MetaFileType;
  date?: string;
  published?: boolean = true;
  description?: string;
  gists?: GistContent[];

  constructor(input?: MetaFileData) {
    if (!input) {
      return;
    }
    this.title =
      input.title ||
      throwIllegalArgumentException(`No title found in ${input}`);
    this.path =
      input.path || throwIllegalArgumentException(`No path found in ${input}`);
    this.type =
      input.type || throwIllegalArgumentException(`No type found in ${input}`);
    this.date = input.date;
    this.published = input.published;
    this.raw = input.raw;
    this.description = input.description;
    this.gists = input.gists ? input.gists : [];
  }

  static createFromRawMd(raw: string, path?: string): MetaFile {
    let file = new MetaFile();
    const matches = raw.split(DASHES);
    file.raw = matches[2].trim();

    const obj = parseHeader(matches[1]);
    file.title = obj.title;
    file.date = obj.date;
    file.published =
      obj.published === '0' || obj.published === 'false' ? false : true;
    file.path = path;
    file.gists = [];
    file.type = 'article';
    return file;
  }

  static createFromJson(raw: string, path?: string): MetaFile {
    const json = JSON.parse(raw);
    let file = new MetaFile();
    file.title = json.title || null;
    file.date = json.date || null;
    file.published = json.published || true;
    file.path = path;
    file.gists = json.gists || [];
    file.type = 'error';
    return file;
  }

  static fromData(input: any | any[]): MetaFile | MetaFile[] {
    if (!input) {
      return null;
    }
    if (isArray(input)) {
      return input.map(castOrCreate);
    } else {
      return castOrCreate(input);
    }
  }

  moment(): moment.Moment {
    const m = moment(this.date, INPUT_FORMATS, true);

    if (m.isValid()) {
      return m;
    }

    throw ex.illegalFromatException(
      'Could not parse ' +
        this.date +
        ' as date using formats: ' +
        INPUT_FORMATS
    );
  }
}

function parseHeader(text) {
  const lines = text.trim().split(NL_SPLIT);
  return lines
    .map(line => {
      const pair = line.split(KV_SPLIT);
      const key = pair.shift();
      return {
        key: key.trim(),
        value: pair.join(':').trim()
      };
    })
    .reduce(
      (prev, current) => {
        prev[current.key] = current.value;
        return prev;
      },
      {
        title: null,
        date: null,
        template: null,
        published: null
      }
    );
}

function castOrCreate(data: any): MetaFile {
  if (!isValidMetaFileData(data)) {
    throw new Error('Given data is not a valid MetaFileData');
  }
  if (isValidMetaFile(data)) {
    return data;
  }
  return new MetaFile(data);
}

function throwIllegalArgumentException(msg): any {
  throw ex.illegalArgumentException(msg);
}

export function isValidMetaFile(file: any): file is MetaFile {
  return file && file.moment && isValidMetaFileData(file);
}

function isValidMetaFileData(file): file is MetaFileData {
  return file && file.title && file.path && file.type;
}
