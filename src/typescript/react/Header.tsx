import * as React from 'react';
import {Icon} from './Icon';
import {VALOTAS} from '../utils';
import {Link} from './Link';
import {LoadingBar} from './LoadingBar';
import {MetaFileStore} from '../content/MetaFileStore';

interface HeaderProps extends React.Props<any> {
	title: string;
	subtitle?: string;
	date?: string;
	metafileStore?: MetaFileStore;
}

export function Header ({title, subtitle = VALOTAS, date, metafileStore}: HeaderProps) {
	return (
		<div className='jumbotron'>
			<LoadingBar/>
			<div className='container'>
				<div className='col-md-3'>
					<Link className='photo img-rounded' metafileStore={metafileStore}/>
				</div>
				<div className='col-md-9 signature'>
					<h1 className='row whitebg'>{title}</h1>
					<p className='row whitebg'>
						<span>{subtitle}</span>
						<Date date={date} />
					</p>
					<div className='row whitebg social'>
						<a href='https://github.com/valotas' target='_blank'>
							<Icon name='fa-github-square' size='2x'/>
						</a>
						<a href='https://www.facebook.com/valotas' target='_blank'>
							<Icon name='fa-facebook-square' size='2x'/>
						</a>
						<a href='https://twitter.com/valotas' target='_blank'>
							<Icon name='fa-twitter-square' size='2x'/>
						</a>
						<a href='http://www.linkedin.com/in/valotas' target='_blank'>
							<Icon name='fa-linkedin-square' size='2x'/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

function Date ({date = null}) {
	if (date === null) {
		return null;
	}
	return (
		<span className='badge date'>
			<Icon name='fa-pencil-square-o' />
			&nbsp;
			{date}
		</span>
	);
}
