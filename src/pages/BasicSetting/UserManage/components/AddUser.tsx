import { Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { addNewUser } from '../../../../api/userManage';
interface IProps {
  open: boolean;
  onCancel(refresh?: boolean): void;
}
function AddUser({ open, onCancel }: IProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);
  function addUser(u: User) {
    addNewUser(u).then((res) => {
      if (res.success) {
        message.success('添加成功');
        onCancel(true);
      } else {
        message.error(res.errorMessage);
      }
    });
  }
  return (
    <Modal
      forceRender
      title="新增用户"
      open={open}
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        form.submit();
      }}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} form={form} onFinish={addUser}>
        <Form.Item
          label="用户名"
          name={'username'}
          rules={[
            {
              required: true,
              type: 'string',
              message: '用户名不可以为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name={'email'}
          rules={[
            {
              required: true,
              type: 'email',
              message: '邮箱格式不合法',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name={'password'}
          rules={[
            {
              required: true,
              type: 'string',
              min: 6,
              message: '密码至少要6位',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddUser;
