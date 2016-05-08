import * as React from 'react';

interface IconProps extends React.Props<any> {
	name: string;
	size?: string;
}

export function Icon (props: IconProps) {	
	const className = 'fa ' + props.name + ' fa-' +  (props.size || '1x');
	return (
		<i className={className} />
	);
}
