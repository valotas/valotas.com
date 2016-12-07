import * as React from 'react';
import { Header } from './Header';
import { VALOTAS } from '../utils';
import { Link } from './Link';
import { Icon } from './Icon';

export function ErrorWithHeader({}, {metafileStore}) {
  return (
    <div>
      <Header title={VALOTAS} subtitle='Things to remember | Programming stuff :)' />
      <div className='container main'>
        <div className='article text-center'>
          <Icon name='fa-meh-o' size='5x' />
          <p>
            It looks like what you are looking for is not here.
						<Link metafileStore={metafileStore}>
              Try going&nbsp;
							<Icon name='fa-home' size='sm-2x' />
              &nbsp;again?
						</Link>
          </p>
        </div>
        <div className='actions button-group'>
          <Link href='#' className='button'>
            <span className='text'>Top&nbsp;</span>
            <Icon name='fa-toggle-up' size='sm-2x' />
          </Link>
        </div>
      </div>
    </div>
  );
}
