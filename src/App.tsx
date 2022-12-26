import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import router from './router';
import './App.css';
// import Login from './pages/login';
// import UserManage from './pages/BasicSetting/UserManage';
// import RoleManage from './pages/BasicSetting/RoleManage';
// import AppLayout from './components/AppLayout';
// import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/basicSetting/userManage" element={<UserManage />}></Route>
          <Route path="/basicSetting/roleManage" element={<RoleManage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes> */}
      <Suspense fallback={<Spin />}>{useRoutes(router)}</Suspense>
    </>
  );
}

export default App;
