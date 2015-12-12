import * as React from 'react';

interface IconProps extends React.Props<any> {
	name: string;
	size?: string;
}

export class Icon extends React.Component<IconProps, {}> {	
	render() {
		const size = this.props.size || 'fa-2x';
		const className = 'fa ' + this.props.name + ' ' +  size;
		return (
			<i className={className} />
		);
	}
}
