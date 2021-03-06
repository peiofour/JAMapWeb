import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BoardsPage from './pages/BoardsPage';
import AddBoardPage from './pages/AddBoardPage';
import AddMemberPage from './pages/AddMemberPage';

const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/addboard" element={<AddBoardPage />} />
      <Route path="/addmember" element={<AddMemberPage />} />
    </Routes>
  );
}

export default App;
