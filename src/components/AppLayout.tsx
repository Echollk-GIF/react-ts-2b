import React, { ReactNode, useState, useEffect } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { matchRoutes, Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import router from '../router';
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKeys, setdefaultSelectedKeys] = useState<string[]>([]);
  function getMenuList(routers: any) {
    let t = [];
    for (let r of routers) {
      if (r.hide) {
        continue;
      }
      let tmp = {
        key: r.path,
        label: r.label,
        icon: r.icon,
      };
      if (r.children) {
        // @ts-ignore
        tmp.children = getMenuList(r.children);
      }
      t.push(tmp);
    }
    return t;
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function goToRouterPage(info: MenuInfo) {
    navigate(info.key);
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== '/login') {
      navigate('/login');
    }
  }
  useEffect(() => {
    checkToken();
    window.logout = () => {
      localStorage.clear();
      navigate('/login');
    };
    // const token = localStorage.getItem('token');
    // if (token) {
    // dispatch(getCurrentInfo());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkToken();
    const routerList = matchRoutes(router, location.pathname);
    // 更新了state 视图会重新渲染
    if (routerList) {
      setdefaultSelectedKeys(routerList.map((r) => r.pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (defaultSelectedKeys.length === 0) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          items={getMenuList(router)}
          onClick={goToRouterPage}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultSelectedKeys}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
