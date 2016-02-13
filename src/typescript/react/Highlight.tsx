import * as React from 'react';
import * as ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import {GistStore} from '../content/GistStore';
import {isPromise} from '../utils';
import {Link} from './Link';
import {Icon} from './Icon';

interface HighlightProps extends React.Props<any>, GistDescription {
	language: string;
}

export class Highlight extends React.Component<HighlightProps, any> {
	
	constructor(props, context) {
		super(props, context);
	}
	
	componentDidMount() {
		highlightCode(this);
	}
    
    componentDidUpdate() {
        highlightCode(this)
    }
    
	render() {
        return <div>{this.props.children}</div>;
	}
}

function highlightCode (component) {
    const domNode = ReactDOM.findDOMNode(component);
    const nodes = domNode.querySelectorAll('pre code');
    
    for (let i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]);    
    }
}