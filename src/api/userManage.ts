import request from '../utils/request';

//获取用户列表
export function getUserList(current = 1, pageSize = 15) {
  return request.get<any, IPagination<User>>('/api/userManage/userList', {
    params: {
      current,
      pageSize,
    },
  });
}

//根据id删除用户
export function deleteUserById(id: number) {
  return request.delete<any, Response>(`/api/userManage/deleteUserById/${id}`);
}
