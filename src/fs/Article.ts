import {MdFile} from './MdFile';
import {moment} from 'moment';

const INPUT_FORMATS = [
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD'
];

export class Article {
    _html: string;

    constructor(private _file: MdFile) {

    }

    moment() {
        var date = this._file.date,
            m = moment(date, INPUT_FORMATS);
        if (m.isValid()) {
            return m;
        }
        throw {
            name: 'IllegalFormatException',
            message: 'Could not parse ' + date + ' as date using formats: ' + INPUT_FORMATS
        };
    }

    date(format: string) {
        return this.moment().format(format || 'DD/MM/YYYY');
    }

    html() {
        if (!this._html) {
            this._html = 'asdasd';
        }
        if(this._html.length > 4) {
            this._html = this._html.replace(/<p>(.)(.*)/, '<p><span class="first-letter">$1</span>$2');
        }
        return this._html;
    }

}