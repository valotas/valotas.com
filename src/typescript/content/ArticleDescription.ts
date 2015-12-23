import * as moment from 'moment';
import * as marked from 'marked';
import {MetaFile} from './MetaFile';
import * as ex from '../exceptions';

const INPUT_FORMATS = [
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD'
];

export class ArticleDescription {
    title: string;
    key: string;

    private _date: string;
    private _description: string;
    
    constructor(meta: MetaFile) {
        this.title = meta.title;
        this.key = meta.path;
        this._date = meta.date;
        this._description = meta.description;
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