import request from '../utils/request';

//账号密码登录
export function userPassLogin(userPassForm: userPassLoginForm) {
  return request.post<any, Response<{ token: string }>>('/api/user/userpasslogin', userPassForm);
}

//根据token获取当前登录用户的信息
export function getUserInfoCurrent() {
  return request.get<any, Response<{ user: User; permissionList: Permission[] }>>(
    '/api/userInfo/current',
  );
}
