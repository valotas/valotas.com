import * as moment from 'moment';
import * as ex from '../exceptions';
import {isArray} from '../utils';

const DASHES = /\n?---/;
const NL_SPLIT = /\n/;
const KV_SPLIT = /\n|\:/;
const INPUT_FORMATS = [
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD'
];

export class MetaFile implements MetaFileData {
    title: string;
    path: string;
    date: string;
    published: boolean = true;
    raw: string;
    description: string;
    template: string;
    gists: GistContent[];
    error?: any;

    constructor(input?: MetaFileData) {
        if (!input) {
            return;
        }
        this.title = input.title;
        this.path = input.path;
        this.date = input.date;
        this.published = input.published;
        this.raw = input.raw;
        this.description = input.description;
        this.template = input.template;
        this.gists = input.gists ? input.gists : [];
        this.error = input.error ? input.error : false;
    }

    static create(raw: string, path?: string): MetaFile {
        let file = new MetaFile();
        const matches = raw.split(DASHES);
        file.raw = matches[2].trim();

        const obj = parseHeader(matches[1]);
        file.title = obj.title;
        file.date = obj.date;
        file.template = obj.template;
        file.published = obj.published === '0' || obj.published === 'false' ? false : true;
        file.path = path;
        file.gists = [];
        return file;
    }

    static createError(error: string): MetaFile {
        let file = new MetaFile();
        file.raw = '';
        file.title = 'Oups!';
        file.date = null;
        file.template = null;
        file.published = true;
        file.path = null;
        file.gists = [];
        file.error = error;
        return file;
    }

    static fromData(input: MetaFileData|MetaFileData[]): MetaFile|MetaFile[] {
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

        throw ex.illegalFromatException('Could not parse ' + this.date + ' as date using formats: ' + INPUT_FORMATS);
    }
}

function parseHeader (text) {
    const lines = text.trim().split(NL_SPLIT);
    return lines.map((line) => {
        const pair = line.split(KV_SPLIT);
        const key = pair.shift();
        return {
            key: key.trim(),
            value: pair.join(':').trim()
        };
    }).reduce((prev, current) => {
        prev[current.key] = current.value;
        return prev;
    }, {
        title: null,
        date: null,
        template: null,
        published: null
    });
}

function castOrCreate(data: MetaFileData): MetaFile {
    if (isValidMetaFile(data)) {
        return data;
    }
    return new MetaFile(data);
}

export function isValidMetaFile(file: any): file is MetaFile {
    return (file && file.title && file.path && file.date && file.moment) || 
        (file && file.error);
}