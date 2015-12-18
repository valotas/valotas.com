import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MdFile} from './content/MdFile';
import {Layout} from './react/Layout';
import {unEscapeTags} from './utils';

console.time('load');
const query = document.querySelector.bind(document);
const mdHolder = query('script[type="application/json"]') as HTMLElement;
const json = unEscapeTags(mdHolder.innerHTML);
const mdfile = JSON.parse(json) as MdFile;
ReactDom.render(React.createElement(Layout, {mdfile: mdfile}), query('#app'), () => console.timeEnd('load'));