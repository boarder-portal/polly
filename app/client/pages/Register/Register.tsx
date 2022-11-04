import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authHttpClient from 'client/utilities/HttpClient/AuthHttpClient';

import usePromise from 'client/hooks/usePromise';

import Flex from 'client/components/Flex/Flex';
import Heading from 'client/components/Heading/Heading';
import Input from 'client/components/Input/Input';
import Button from 'client/components/Button/Button';

import * as styles from './Register.module.scss';

const RegisterPage: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {
    run: register,
    value,
    isLoading,
    isError,
  } = usePromise(() =>
    authHttpClient.register({
      login,
      password,
    }),
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      await register();
    },
    [register],
  );

  useEffect(() => {
    if (value) {
      navigate('/');
    }
  }, [navigate, value]);

  return (
    <Flex className={styles.root} direction="column" alignItems="center" justifyContent="center" between={3}>
      <Heading level={1}>Регистрация</Heading>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input required type="text" placeholder="Логин" value={login} onChange={setLogin} />

        <Input required type="password" placeholder="Пароль" value={password} onChange={setPassword} />

        <Button disabled={isLoading}>Регистрация</Button>

        <span className={styles.error}>{isError ? 'Ошибка регистрации' : '\u00a0'}</span>
      </form>
    </Flex>
  );
};

export default RegisterPage;