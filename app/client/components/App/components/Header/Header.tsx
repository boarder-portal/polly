import { FC, memo, useCallback } from 'react';

import { urls } from 'client/constants/urls';

import authHttpClient from 'client/utilities/HttpClient/AuthHttpClient';

import usePromise from 'client/hooks/usePromise';
import useAtom from 'client/hooks/useAtom';

import Flex from 'client/components/Flex/Flex';
import Link from 'client/components/Link/Link';

import { userAtom } from 'client/atoms/user';

import * as styles from './Header.module.scss';

interface Props {}

const Header: FC<Props> = () => {
  const { value: user, setValue: setUser } = useAtom(userAtom);

  const { run: logout } = usePromise(() => authHttpClient.logout());

  const handleLogoutClick = useCallback(async () => {
    await logout();

    setUser(null);
  }, [logout, setUser]);

  return (
    <header className={styles.root}>
      <Flex className={styles.content} alignItems="center" justifyContent="spaceBetween" between={4}>
        <Link className={styles.homeLink} to="/">
          Polly
        </Link>

        {user ? (
          <Link onClick={handleLogoutClick}>Выйти</Link>
        ) : (
          <Flex between={4}>
            <Link to={urls.register}>Регистрация</Link>
            <Link to={urls.login}>Войти</Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default memo(Header);
