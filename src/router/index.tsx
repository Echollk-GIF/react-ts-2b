import { Spin } from 'antd';
import { lazy, ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, DashboardOutlined } from '@ant-design/icons';
import Login from '../pages/login';
import AppLayout from '../components/AppLayout';
import Home from '../pages/Home/index';
const UserManage = lazy(() => import('../pages/BasicSetting/UserManage/index'));
const RoleManage = lazy(() => import('../pages/BasicSetting/RoleManage/index'));

function lazyLoad(children: ReactNode) {
  return <Suspense fallback={<Spin />}>{children}</Suspense>;
}
const router = [
  {
    path: '/',
    hide: true,
    icon: <LaptopOutlined />,
    element: <Navigate to="/home" replace={true} />,
  },
  {
    // path: '/',
    // element: <AppLayout />,
    // children: [
    //   {
    //     path: '/home',
    //     label: '首页',
    //     element: <Home />,
    //   },
    // ],
    path: '/home',
    label: '主页',
    icon: <DashboardOutlined />,
    element: <AppLayout> {lazyLoad(<Home />)}</AppLayout>,
  },
  {
    path: '/basicSetting',
    label: '用户管理',
    icon: <UserOutlined />,
    element: <AppLayout />,
    children: [
      {
        path: '/basicSetting/userManage',
        label: '用户列表',
        icon: <UserOutlined />,
        element: lazyLoad(<UserManage />),
      },
      {
        path: '/basicSetting/roleManage',
        label: '角色列表',
        icon: <UserOutlined />,
        element: lazyLoad(<RoleManage />),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];
export default router;
