import * as React from 'react';
import {ArticleDescription} from '../content/ArticleDescription';
import {MetaFileStore} from '../content/MetaFileStore';
import {Icon} from './Icon'

export class ParagraphWithFirstLetterSpan extends React.Component<any, any> {	
	render() {
        const childs = React.Children.toArray(this.props.children);
        const child = childs[0] as string;
        const first = child[0];
        childs[0] = child.substr(1);
		return <p><span className="first-letter">{first}</span>{childs}</p>;
	}
}
