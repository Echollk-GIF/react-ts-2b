import React from 'react';
import { Popconfirm, Button, message } from 'antd';
import { deleteUserById } from '../../../../api/userManage';
interface Props {
  id: number;
  onDelete(id: number): void;
  //onDelete是删除之后刷新页面执行的回调函数
}
function DeleteUser({ id, onDelete }: Props) {
  function deleteUser() {
    deleteUserById(id).then((res) => {
      if (res.success) {
        onDelete(id);
        message.success('删除成功');
      } else {
        message.error(res.errorMessage);
      }
    });
  }
  function cancel() {
    message.info('取消删除');
  }
  return (
    <>
      <Popconfirm title="删除用户" onCancel={cancel} onConfirm={deleteUser}>
        <Button type="primary" danger>
          删除
        </Button>
      </Popconfirm>
    </>
  );
}

export default DeleteUser;
