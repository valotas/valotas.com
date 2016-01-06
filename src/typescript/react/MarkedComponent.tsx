import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';
import {MetaFile} from '../content/MetaFile';
import {createComponentTree} from './MarkedRenderer';

interface MarkedComponentProps extends React.Props<any> {
	meta: MetaFile
}

export class MarkedComponent extends React.Component<MarkedComponentProps, any>{
	render() {
		return createComponentTree(this.props.meta.raw, {firstLetterSpan: true});
	}	
}
