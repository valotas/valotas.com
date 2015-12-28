import * as moment from 'moment';
import * as marked from 'marked';
import {MetaFile} from './MetaFile';

export class ArticleDescription {
    title: string;
    key: string;

    private _description: string;
    
    constructor(public meta: MetaFile) {
        this.title = meta.title;
        this.key = meta.path;
        this._description = meta.description;
    }

    moment(): moment.Moment {
        return this.meta.moment();
    }

    date(format?: string): string {
        return this.moment().format(format || 'DD/MM/YYYY');
    }

    description(): string {
        return this._description;
    }
}