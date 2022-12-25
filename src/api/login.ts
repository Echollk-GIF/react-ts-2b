import request from '../utils/request';

//账号密码登录
export function userPassLogin(userPassForm: userPassLoginForm) {
  return request.post<any, Response<{ token: string }>>('/api/user/userpasslogin', userPassForm);
}
