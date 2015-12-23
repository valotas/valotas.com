import * as moment from 'moment';
import * as marked from 'marked';
import {MetaFile} from './MetaFile';
import {ArticleDescription} from './ArticleDescription';
import * as ex from '../exceptions';

export class Article extends ArticleDescription {
    private _html: string;

    constructor(public meta: MetaFile) {
        super(meta);
    }

    html(): string {
        if (!this._html) {
            this._html = marked(this.meta.raw);
        }
        if (this._html.length > 4) {
            this._html = this._html.replace(/<p>(.)(.*)/, '<p><span class="first-letter">$1</span>$2');
        }
        return this._html;
    }

    description(): string {
        const html = this.html();
        return html.substring(0, html.indexOf('<h2 id='));
    }
}