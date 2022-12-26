import React from 'react';
import './App.css';
import Login from './pages/login';
import UserManage from './pages/BasicSetting/UserManage';
import RoleManage from './pages/BasicSetting/RoleManage';
import AppLayout from './components/AppLayout';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/basicSetting/userManage" element={<UserManage />}></Route>
          <Route path="/basicSetting/roleManage" element={<RoleManage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
