import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile, isValidMetaFile} from './content/MetaFile';
import {MetaFileStore} from './content/MetaFileStore';
import {Layout} from './react/Layout';
import {inflate, VALOTAS} from './utils';
import {loadWebfonts} from './google';

console.time('load');

loadWebfonts();

const query = document.querySelector.bind(document);
const metaHolder = query('script[type="application/json"]') as HTMLElement;
const meta = inflate(metaHolder.innerHTML) as MetaFile|MetaFile[];
console.debug('Infalted meta', meta);

// Create the main store and register the state to the history object
const metafileStore = new MetaFileStore(window);
metafileStore.onChange((meta) => {
	if (isValidMetaFile(meta)) {
		history.pushState(meta, meta.title, '/' + meta.path + '/');
	}
	history.pushState(meta, VALOTAS, '/');
});


// Render the main react component
const el = React.createElement(Layout, {
	meta: meta,
	metafileStore: metafileStore,
	win: window
});
ReactDom.render(el, query('#app'), () => console.timeEnd('load'));