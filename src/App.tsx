import React from 'react';
import './App.css';
import Login from './pages/login';
import UserManage from './pages/BasicSetting/UserManage';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/basicSetting/userManage" element={<UserManage />}></Route>
      </Routes>
    </>
  );
}

export default App;
