import axios from "axios";
import storage from "@/assets/storage.js";
axios.defaults.baseURL = "/api";
const base = "";

function setToken() {
  let token = storage.get("TOKEN");
  axios.defaults.headers.common["token"] = token;
}
// 一键注册
export function register() {
  return axios.get(`${base}/register`);
}

//token 登录
export function login_by_token() {
  setToken();
  return axios.post(`${base}login_by_token`);
}

//账密登录
export function login_by_password(data) {
  return axios.post(`${base}/login`, data);
}

//token 查询信息
export function get_info_by_token(data) {
  setToken();
  return axios.post(`${base}/info_by_token`, data);
}

//发送邮箱验证码
export function send_email_code(data) {
  return axios.get(`${base}/email_code`, { params: data });
}

//校验邮箱验证码
export function email_code_valid(data) {
  return axios.get(`${base}/email_code_valid`, { params: data });
}
