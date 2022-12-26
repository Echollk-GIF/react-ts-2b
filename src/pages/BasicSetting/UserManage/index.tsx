import React, { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { getUserList } from '../../../api/userManage';
import { ColumnsType } from 'antd/lib/table';
import DeleteUser from './components/DeleteUser';

const UserManage = () => {
  const [userList, setUserList] = useState<User[]>([]);

  //根据页获取数据
  function getUserListByPage() {
    getUserList().then((res) => {
      setUserList(res.data.list);
    });
  }
  //删除后刷新页面数据
  function deleteUserRefresh(id: number) {
    // setUserList(userList.filter((user) => user.id !== id));
    getUserListByPage();
  }

  useEffect(() => {
    getUserListByPage();
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      render(record) {
        return (
          <Space>
            <Button type="primary">编辑</Button>
            <DeleteUser id={record.id} onDelete={deleteUserRefresh} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table dataSource={userList} columns={columns} rowKey={'id'} />
    </>
  );
};

export default UserManage;
