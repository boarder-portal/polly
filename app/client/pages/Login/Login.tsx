import { FC, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { urls } from 'client/constants/urls';

import authHttpClient from 'client/utilities/HttpClient/AuthHttpClient';

import usePromise from 'client/hooks/usePromise';
import useSharedStoreValue from 'client/hooks/useSharedStoreValue';

import Flex from 'client/components/Flex/Flex';
import Heading from 'client/components/Heading/Heading';
import Input from 'client/components/Input/Input';
import Button from 'client/components/Button/Button';

import * as styles from './Login.module.scss';

const LoginPage: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { setValue: setUser } = useSharedStoreValue('user');

  const navigate = useNavigate();

  const {
    run: loginRequest,
    isLoading,
    isError,
  } = usePromise(() =>
    authHttpClient.login({
      login,
      password,
    }),
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const { user } = await loginRequest();

      setUser(user);
      navigate(urls.home);
    },
    [loginRequest, navigate, setUser],
  );

  return (
    <Flex className={styles.root} direction="column" alignItems="center" justifyContent="center" between={3}>
      <Heading level={1}>Вход</Heading>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input required type="text" placeholder="Логин" value={login} onChange={setLogin} />

        <Input required type="password" placeholder="Пароль" value={password} onChange={setPassword} />

        <Button disabled={isLoading}>Войти</Button>

        <span className={styles.error}>{isError ? 'Неверный логин или пароль' : '\u00a0'}</span>
      </form>
    </Flex>
  );
};

export default LoginPage;
