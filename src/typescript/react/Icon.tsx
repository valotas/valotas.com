import * as React from 'react';

interface IconProps {
	name: string;
	size?: string;
}

export function Icon (props: IconProps) {
	const className = 'fa ' + props.name + ' fa-' +  (props.size || '1x');
	return (
		<i className={className} />
	);
}
