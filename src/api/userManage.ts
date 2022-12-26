import request from '../utils/request';

//获取用户列表
export function getUserList(current = 1, pageSize = 2) {
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
//根据id更新用户信息
export function updateUserById(id: number, user: User) {
  return request.patch<any, Response>(`/api/userManage/updateUserById/${id}`, user);
}
//新增用户
export function addNewUser(user: User) {
  return request.post<any, Response>('/api/userManage/addUser', user);
}
