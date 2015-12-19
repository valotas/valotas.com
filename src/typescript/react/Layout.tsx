import * as React from 'react';
import {Article} from '../content/Article';
import {MdFile} from '../content/MdFile';
import {ArticleComponent} from './ArticleComponent';
import {Index} from './Index';
import {Header} from './Header';
import {Footer} from './Footer';

/* Stateless functional components are not supported yet?
export function Layout() {
	return (<div className="lol">Layout here</div>);
}
*/

interface LaypoutProps extends React.Props<any> {
	mdfile?: MdFile;
	articles?: Article[];
}

//http://staxmanade.com/2015/08/playing-with-typescript-and-jsx/
export class Layout extends React.Component<LaypoutProps, {}> {
	render() {
		const content = this.createMainContent()
		return (
			<div>
				<Header title="The title" subtitle="the subtitle" />
				<div id="content" className="container">
					{content}
				</div>
				<Footer/>
			</div>
		);
	}
	
	private createMainContent() {
		const articles = this.props.articles;
		if (articles) {
			return <Index articles={articles}/>;
		}
		
		const mdfile = this.props.mdfile;
		if (mdfile) {
			const article = new Article(mdfile);
			return <ArticleComponent article={article} />;		
		}
		return null;
	}
}
