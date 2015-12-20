import * as React from 'react';

interface IconProps extends React.Props<any> {
	name: string;
	size?: string;
}

export class Icon extends React.Component<IconProps, {}> {	
	render() {
		const className = 'fa ' + this.props.name + ' fa-' +  (this.props.size || '1x');
		return (
			<i className={className} />
		);
	}
}
