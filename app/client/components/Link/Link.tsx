import { forwardRef, memo } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import * as styles from './Link.module.scss';

interface Props extends LinkProps {}

const Link = forwardRef<HTMLAnchorElement | null, Props>((props, ref) => {
  const { className, ...rest } = props;

  return <RouterLink className={classNames(styles.root, className)} ref={ref} {...rest} />;
});

Link.displayName = 'Link';

export default memo(Link);
