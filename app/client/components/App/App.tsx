import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from 'client/components/App/components/Header/Header';

import Home from 'client/pages/Home/Home';
import Register from 'client/pages/Register/Register';

import * as styles from './App.module.scss';

const App: FC = () => {
  return (
    <>
      <Header />

      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};

export default memo(App);
