import * as React from 'react';
import {Icon} from './Icon';

interface HeaderProps extends React.Props<any> {
	title: string;
	subtitle: string;
}

export class Header extends React.Component<HeaderProps, {}> {	
	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-md-3">
						<a className="photo img-rounded" href="/"/>
					</div>
					<div className="col-md-9 signature">
						<h1 className="row whitebg">{this.props.title}</h1>
						<p className="row whitebg">{this.props.subtitle}</p>
						<div className="row whitebg social">
							<a href="https://github.com/valotas" target="_blank">
								<Icon name="fa-github-square"/>
							</a>
							<a href="https://www.facebook.com/valotas" target="_blank">
								<Icon name="fa-facebook-square"/>
							</a>
							<a href="https://twitter.com/valotas" target="_blank">
								<Icon name="fa-twitter-square"/>
							</a>
							<a href="http://www.linkedin.com/in/valotas" target="_blank">
								<Icon name="fa-linkedin-square"/>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
