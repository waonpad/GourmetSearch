import { forwardRef } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import clsx from 'clsx';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  return (
    <RouterLink
      ref={ref}
      className={clsx('text-indigo-600 hover:text-indigo-900', props.className)}
      {...props}
    />
  );
});
