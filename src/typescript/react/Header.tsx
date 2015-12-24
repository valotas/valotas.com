import * as React from 'react';
import {Icon} from './Icon';
import {VALOTAS} from '../utils';

interface HeaderProps extends React.Props<any> {
	title: string;
	subtitle?: string;
	date?: string
}

export class Header extends React.Component<HeaderProps, {}> {	
	render() {
		const subtitle = this.props.subtitle || VALOTAS;
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-md-3">
						<a className="photo img-rounded" href="/"/>
					</div>
					<div className="col-md-9 signature">
						<h1 className="row whitebg">{this.props.title}</h1>
						<p className="row whitebg">
							<span>{subtitle}</span>
							{this.renderDate()}
						</p>
						<div className="row whitebg social">
							<a href="https://github.com/valotas" target="_blank">
								<Icon name="fa-github-square" size="2x"/>
							</a>
							<a href="https://www.facebook.com/valotas" target="_blank">
								<Icon name="fa-facebook-square" size="2x"/>
							</a>
							<a href="https://twitter.com/valotas" target="_blank">
								<Icon name="fa-twitter-square" size="2x"/>
							</a>
							<a href="http://www.linkedin.com/in/valotas" target="_blank">
								<Icon name="fa-linkedin-square" size="2x"/>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
	renderDate() {
		if (!this.props.date) {
			return null;
		}
		return (
			<span className="badge date">
				<Icon name="fa-pencil-square-o" />
				&nbsp;
				{this.props.date}
			</span>
		)
	}
}
