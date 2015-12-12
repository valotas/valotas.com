import * as React from 'react';

/* Stateless functional components are not supported yet?
export function Layout() {
	return (<div className="lol">Layout here</div>);
}
*/

//http://staxmanade.com/2015/08/playing-with-typescript-and-jsx/
export class Layout extends React.Component<any, {}> {	
	render() {
		return (
			<div className="lol">Layout here</div>
		);
	}
}
