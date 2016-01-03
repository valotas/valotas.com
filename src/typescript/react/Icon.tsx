import * as React from 'react';

interface IconProps extends React.Props<any> {
	name: string;
	size?: string;
}

export function Icon ({name, size}: IconProps) {	
	const className = 'fa ' + name + ' fa-' +  (size || '1x');
	return (
		<i className={className} />
	);
}