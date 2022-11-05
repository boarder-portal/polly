import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { urls } from 'client/constants/urls';

import Header from 'client/components/App/components/Header/Header';

import Home from 'client/pages/Home/Home';
import Register from 'client/pages/Register/Register';
import Login from 'client/pages/Login/Login';

import * as styles from './App.module.scss';

const App: FC = () => {
  return (
    <>
      <Header />

      <main className={styles.content}>
        <Routes>
          <Route path={urls.home} element={<Home />} />
          <Route path={urls.register} element={<Register />} />
          <Route path={urls.login} element={<Login />} />
        </Routes>
      </main>
    </>
  );
};

export default memo(App);
