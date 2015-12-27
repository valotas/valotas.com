import * as moment from 'moment';
import * as ex from '../exceptions';

const DASHES = /\n?---/;
const KV_SPLIT = /\n|\:/;
const INPUT_FORMATS = [
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD'
];

function findValue(pairs, key) {
    for (var i = 0; i < pairs.length; i++) {
        if (key === pairs[i]) {
            return pairs[i + 1].trim();
        }
    }
}

function findBoolean(pairs, key) {
    const value = findValue(pairs, key);
    if (value === 'false' || value === '0') {
        return false;
    }
    return true;
}

export interface MetaFileInput {
    title: string;
    path: string;
    date: string;
    published?: boolean;
    raw?: string;
    description?: string;
    template?: string;
}

export class MetaFile {
    title: string;
    path: string;
    date: string;
    published: boolean = true;
    raw: string;
    description: string;
    template: string;
    
    constructor(input?: MetaFileInput) {
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
    }
    
    static create(raw: string, path?: string): MetaFile {
        let file = new MetaFile();
        const matches = raw.split(DASHES);
        file.raw = matches[2].trim();

        const pairs = matches[1].trim().split(KV_SPLIT); 
        file.title = findValue(pairs, 'title');
        file.date = findValue(pairs, 'date');
        file.template = findValue(pairs, 'template');
        file.published = findBoolean(pairs, 'published');
        file.path = path;
        return file;
    }

    moment(): moment.Moment {
        const m = moment(this.date, INPUT_FORMATS, true);

        if (m.isValid()) {
            return m;
        }

        throw new ex.IllegalFromatException('Could not parse ' + this.date + ' as date using formats: ' + INPUT_FORMATS);
    }
}

export function isValidMetaFile(file: any): file is MetaFile {
    return file && file.title && file.path && file.date;
}
