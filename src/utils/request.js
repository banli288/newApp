import axios from "axios";
import { showToast } from "vant";

const request = axios.create({
  baseURL: "/api", // 后端会告诉你真实地址
  timeout: 10000,
});

// 请求拦截器 — 后期加 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    showToast("网络异常");
    return Promise.reject(err);
  },
);

export default request;
