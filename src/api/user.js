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
export function send_email_code_new(data) {
  return axios.get(`${base}/email_code_new`, { params: data });
}
//校验邮箱验证码
export function email_code_valid(data) {
  return axios.get(`${base}/email_code_valid`, { params: data });
}
//
//绑定邮箱
export function bind_email(data) {
  setToken();
  return axios.post(`${base}/bind_email`, data);
}

//修改密码
export function updata_password(data) {
  return axios.post(`${base}/updata_password`, data);
}

//修改密码
export function updata_password_valid(data) {
  return axios.post(`${base}/updata_password_valid`, data);
}

//修改信息
export function updata_info(data) {
  setToken();
  return axios.post(`${base}/updata_info`, data);
}
//文件上传
export function img_upload(param) {
  let config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios.post(`${base}/upload`, param, config);
}
