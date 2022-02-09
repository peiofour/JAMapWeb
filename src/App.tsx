import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/BoardsPage';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsPage />} />
      </Routes>
    </>
  );
}

export default App;
