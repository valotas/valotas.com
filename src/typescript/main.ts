import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile} from './content/MetaFile';
import {MetaFileService} from './content/MetaFileService';
import {Layout} from './react/Layout';
import {inflate} from './utils';

console.time('load');
const query = document.querySelector.bind(document);
const metaHolder = query('script[type="application/json"]') as HTMLElement;
const meta = inflate(metaHolder.innerHTML) as MetaFile|MetaFile[];
console.debug('Infalted metadata', meta);
const el = React.createElement(Layout, {
	meta: meta,
	metafileService: new MetaFileService(window)
});
ReactDom.render(el, query('#app'), () => console.timeEnd('load'));