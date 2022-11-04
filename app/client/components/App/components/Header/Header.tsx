import { FC, memo } from 'react';

import Flex from 'client/components/Flex/Flex';
import Link from 'client/components/Link/Link';

import * as styles from './Header.module.scss';

interface Props {}

const Header: FC<Props> = () => {
  return (
    <header className={styles.root}>
      <Flex className={styles.content} alignItems="center">
        <Link className={styles.homeLink} to="/">
          Polly
        </Link>
      </Flex>
    </header>
  );
};

export default memo(Header);
