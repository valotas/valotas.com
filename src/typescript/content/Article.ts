import * as moment from 'moment';
import * as marked from 'marked';
import {MdFile} from './MdFile';
import * as ex from '../exceptions';

const INPUT_FORMATS = [
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD'
];

export class Article {
    private _html: string;
    title: string;
    key: string;

    constructor(private _file: MdFile) {
        this.title = _file.title;
        this.key = _file.path;
    }

    moment(): moment.Moment {
        const date = this._file.date,
            m = moment(date, INPUT_FORMATS);
        if (m.isValid()) {
            return m;
        }
        
        throw new ex.IllegalFromatException('Could not parse ' + date + ' as date using formats: ' + INPUT_FORMATS);
    }

    date(format?: string): string {
        return this.moment().format(format || 'DD/MM/YYYY');
    }

    html(): string {
        if (!this._html) {
            this._html = marked(this._file.raw);
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