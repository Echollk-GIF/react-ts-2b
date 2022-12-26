import React, { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { getUserList } from '../../../api/userManage';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import DeleteUser from './components/DeleteUser';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';

const UserManage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  //当前编辑的用户
  const [currentEditUser, setCurrentEditUser] = useState<User>({} as User);
  //编辑用户Modal是否显示
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  //新增用户Modal是否显示
  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    position: ['bottomCenter'],
    showSizeChanger: true,
    showQuickJumper: true,
  });
  //根据页获取数据
  function getUserListByPage(current: number = 1, pageSize: number = 2) {
    getUserList(current, pageSize).then((res) => {
      setUserList(res.data.list);
      setPagination({
        ...pagination,
        ...res.data,
      });
    });
  }
  //删除后刷新页面数据
  function deleteUserRefresh(id: number) {
    // setUserList(userList.filter((user) => user.id !== id));
    getUserListByPage();
  }
  //取消编辑用户
  function cancelEditUser(refresh?: boolean) {
    if (refresh) {
      getUserListByPage();
    }
    setIsShowEditModal(false);
  }
  //取消新增用户
  function cancelAddUser(refresh?: boolean) {
    if (refresh) {
      getUserListByPage();
    }
    setIsShowAddModal(false);
  }

  function change(p: TablePaginationConfig) {
    getUserListByPage(p.current, p.pageSize);
  }

  useEffect(() => {
    getUserListByPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Button
              type="primary"
              onClick={() => {
                setCurrentEditUser(record);
                setIsShowEditModal(true);
              }}
            >
              编辑
            </Button>
            <DeleteUser id={record.id} onDelete={deleteUserRefresh} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsShowAddModal(true);
        }}
      >
        新增
      </Button>
      <Table
        dataSource={userList}
        onChange={change}
        columns={columns}
        rowKey={'id'}
        pagination={pagination}
      />
      <EditUser open={isShowEditModal} onCancel={cancelEditUser} user={currentEditUser} />
      <AddUser open={isShowAddModal} onCancel={cancelAddUser} />
    </>
  );
};

export default UserManage;
