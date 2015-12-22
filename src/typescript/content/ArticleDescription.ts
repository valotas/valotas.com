import * as moment from 'moment';
import * as marked from 'marked';
import {MdFile} from './MdFile';
import * as ex from '../exceptions';

const INPUT_FORMATS = [
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD'
];

function isMdFile (input: any): input is MdFile {
    return input && input.raw;
}

export class ArticleDescription {
    title: string;
    key: string;

    private _date: string;
    private _description: string;
    
    constructor(input: ArticleDescription|MdFile) {
        if (isMdFile(input)) {
            this.title = input.title;
            this.key = input.path;
            this._date = input.date;
        }
        else {
            this.title = input.title;
            this.key = input.key;
            this._date = input._date;
            this._description = input.description();
        }
    }

    moment(): moment.Moment {
        const date = this._date,
            m = moment(date, INPUT_FORMATS);
        if (m.isValid()) {
            return m;
        }
        
        throw new ex.IllegalFromatException('Could not parse ' + date + ' as date using formats: ' + INPUT_FORMATS);
    }

    date(format?: string): string {
        return this.moment().format(format || 'DD/MM/YYYY');
    }

    description(): string {
        return this._description;
    }
}