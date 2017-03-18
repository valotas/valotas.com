import * as React from 'react';
import * as RDS from 'react-dom/server';
import { Icon } from './Icon';

describe('Icon', () => {
  it('should render an i with the given name as classname', () => {
    const html = RDS.renderToString(<Icon name='name' />);
    expect(html).toContain('<i');
    expect(html).toContain('class="fa name fa-1x"');
  });
});
