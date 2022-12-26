import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { updateUserById } from '../../../../api/userManage';
interface IProps {
  user: User;
  open: boolean;
  onCancel(refresh?: boolean): void;
}
const EditUser = ({ user, open, onCancel }: IProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);
  function saveUser(u: User) {
    if (u.password === '') {
      delete u.password;
    }
    updateUserById(user.id, u).then((res) => {
      if (res.success) {
        message.success('更新成功');
        onCancel(true);
      } else {
        message.error(res.errorMessage);
      }
    });
  }
  return (
    <>
      <Modal
        forceRender
        title="编辑用户"
        open={open}
        onCancel={() => {
          onCancel();
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{
            ...user,
            password: '',
          }}
          onFinish={saveUser}
        >
          <Form.Item label="id" name={'id'} hidden>
            <Input />
          </Form.Item>
          <Form.Item label="用户名" name={'username'}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name={'email'}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name={'password'}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditUser;
