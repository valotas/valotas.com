import * as React from 'react';
import {Article} from '../content/Article';
import {ArticleComponent} from './ArticleComponent';
import {Header} from './Header';
import {Footer} from './Footer';

/* Stateless functional components are not supported yet?
export function Layout() {
	return (<div className="lol">Layout here</div>);
}
*/

interface LaypoutProps extends React.Props<any> {
	article?: Article;
} 

//http://staxmanade.com/2015/08/playing-with-typescript-and-jsx/
export class Layout extends React.Component<LaypoutProps, {}> {	
	render() {
		return (
			<div>
				<Header title="The title" subtitle="the subtitle" />
				<ArticleComponent article={this.props.article}/>
				<Footer/>
			</div>
		);
	}
}
