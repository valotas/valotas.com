import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';
import {MetaFile} from '../content/MetaFile';
import {createComponentTree} from './MarkedRenderer';

interface MarkedComponentProps extends React.Props<any> {
	meta?: MetaFile,
    markFirstLetter?: boolean;
}

export class MarkedComponent extends React.Component<MarkedComponentProps, any> {
	render() {
        const {meta} = this.props;
        const markFirstLetter = this.props.markFirstLetter === false ? false : true; 
        const input =  meta ? meta.raw : this.props.children as string;
		return createComponentTree(input, {firstLetterSpan: markFirstLetter});
	}	
}
