import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import { userPassLogin } from '../../api/login';
import './login.scss';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values: userPassLoginForm) => {
    userPassLogin(values).then((res) => {
      if (res.success) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        message.error(res.errorMessage);
      }
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <div className="login-container">
        <Form
          name="normal_login"
          form={form}
          className="login-form"
          initialValues={{
            username: 'admin',
            password: '123456',
            remember: true,
          }}
          onFinish={onFinish}
          {...layout}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="http://www.baidu.com">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <Button htmlType="reset" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
