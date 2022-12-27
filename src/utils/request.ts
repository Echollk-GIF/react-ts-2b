import { message } from 'antd';
import axios from 'axios';
const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${token}`,
    };
  }
  return config;
});
request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response.status === 401) {
      window.logout();
    }
    message.error(err.message);
    return Promise.reject(err);
  },
);
export default request;
