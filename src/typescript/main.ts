import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile, MetaFileData, isValidMetaFile} from './content/MetaFile';
import {MetaFileStore} from './content/MetaFileStore';
import {Layout} from './react/Layout';
import {inflate, VALOTAS} from './utils';
import {loadWebfonts} from './google';

console.time('load');

loadWebfonts();

// Create the main store and register the state to the history object
const metafileStore = new MetaFileStore(window);
metafileStore.onChange((meta) => {
	if (isValidMetaFile(meta)) {
		history.pushState(meta, meta.title, '/' + meta.path + '/');
	} else {
		history.pushState(meta, VALOTAS, '/');
	}
	window.scrollTo(0, 0);
});

console.time('react-load');
const query = document.querySelector.bind(document);
const metaHolder = query('script[type="application/json"]') as HTMLElement;
const metadata = inflate(metaHolder.innerHTML) as MetaFileData|MetaFileData[];
const meta = MetaFile.fromData(metadata);
console.debug('Infalted meta', meta);

// Render the main react component
const el = React.createElement(Layout, {
	meta: meta,
	metafileStore: metafileStore,
	win: window
});
ReactDom.render(el, query('#app'), () => {
	console.timeEnd('load');
	console.timeEnd('react-load');
});
