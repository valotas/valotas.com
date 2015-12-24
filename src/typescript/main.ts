import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MetaFile} from './content/MetaFile';
import {MetaFileStore} from './content/MetaFileStore';
import {Layout} from './react/Layout';
import {inflate} from './utils';

console.time('load');

const query = document.querySelector.bind(document);
const metaHolder = query('script[type="application/json"]') as HTMLElement;
const meta = inflate(metaHolder.innerHTML) as MetaFile|MetaFile[];
console.debug('Infalted meta', meta);

// Create the main store and register the state to the history object
const metafileStore = new MetaFileStore(window);
metafileStore.onChange((meta) => {
	history.pushState(meta, meta.title, '/' + meta.path + '/');
});


// Render the main react component
const el = React.createElement(Layout, {
	meta: meta,
	metafileStore: metafileStore,
	win: window
});
ReactDom.render(el, query('#app'), () => console.timeEnd('load'));