import * as React from 'react';
import {Header} from './Header';
import {VALOTAS} from '../utils';

export function ErrorWithHeader () {
	return (
		<div>
			<Header title={VALOTAS} subtitle='Things to remember | Programming stuff :)'/>
			<div>Oups!</div>
		</div>
	);
}