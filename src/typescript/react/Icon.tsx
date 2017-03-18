import { h } from 'preact';

interface IconProps {
  name: string;
  size?: string;
}

export function Icon({ name, size }: IconProps) {
  const className = 'fa ' + name + ' fa-' + (size || '1x');
  return (
    <i className={className} />
  );
}
