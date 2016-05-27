import * as marked from 'marked';
import * as React from 'react';
import * as ex from '../exceptions';
import {createComponentTree} from './marked/createComponentTree';

interface MarkedComponentProps extends React.Props<any> {
	meta?: MetaFileData;
    markFirstLetter?: boolean;
}

export function MarkedComponent (props: MarkedComponentProps) {
	const {meta, markFirstLetter} = props;
    const firstLetterSpan = markFirstLetter === false ? false : true;
    const input =  meta ? meta.raw : props.children as string;
    return createComponentTree(input, {firstLetterSpan: firstLetterSpan});
}
