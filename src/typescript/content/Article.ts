import * as moment from 'moment';
import * as marked from 'marked';
import {MetaFile} from './MetaFile';
import {ArticleDescription} from './ArticleDescription';
import * as ex from '../exceptions';

export class Article extends ArticleDescription {
    constructor(public meta: MetaFile) {
        super(meta);
    }

    description(): string {
        const {description, raw} = this.meta;
        return description || raw.substr(0, raw.indexOf('#')).trim();
    }
}