import { h } from 'preact';
import { Icon } from './Icon';

interface FooterProps {
  pkg: PackageJson;
}

export function Footer({ pkg }: FooterProps) {
  return (
    <div className='footer'>
      <div className='container text-center'>
        <div className='version'>
          {pkg.name} <strong>v{pkg.version}</strong> &copy; Γιώργος Βαλοτάσιος - CSS by &nbsp;
          <a href='https://twitter.com/MrPirrera' target='_blank'>@MrPirrera</a>
        </div>
        <div className='icon'>
          <Icon name='fa-asterisk' />
        </div>
        <div className='note'>
          The greek name
          "<strong><em>Γιώργος</em></strong>"
          is also know as Yoryos, Georgios or just George which seems to be easier to most english speaking people.
          If you are trying to find out what Βαλοτασιος means, just think of it as Valotasios and you should be fine.
        </div>
      </div>
    </div>
  );
}
