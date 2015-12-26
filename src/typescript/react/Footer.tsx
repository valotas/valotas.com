import * as React from 'react';
import {Icon} from './Icon';

export class Footer extends React.Component<any, {}> {	
	render() {
		return (
			<div id="footer">
				<div className="container text-center">
					<div className="col-md-12">
						&copy; Γιώργος Βαλοτάσιος - CSS by 
						<a href="https://twitter.com/MrPirrera" target="_blank">@MrPirrera</a>
					</div>
					<div className="col-sm-12 col-md-1">
						<Icon name="fa-asterisk" size="2x"/>
					</div>
					<div className="col-sm-12 col-md-11 whitebg">
						The greek name 
						<strong><em>Γιώργος</em></strong>
						is also know as Yoryos, Georgios or just George which seems to be easier to most english speaking people.
						If you are trying to find out what Βαλοτασιος means, just think of it as Valotasios and you should be fine.
					</div>
				</div>
			</div>
		);
	}
}
