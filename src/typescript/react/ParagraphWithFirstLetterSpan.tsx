import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

export class ParagraphWithFirstLetterSpan extends React.Component<any, any> {	
	render() {
        const child = this.props.children as string;
        const first = child[0];
        const remaining = child.substr(1);
		return <p><span className="first-letter">{first}</span>{remaining}</p>;
	}
}
