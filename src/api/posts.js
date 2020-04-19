import axios from "axios";
import storage from "@/assets/storage.js";
axios.defaults.baseURL = "/api";
const base = "/post";

function setToken() {
  let token = storage.get("TOKEN");
  axios.defaults.headers.common["token"] = token;
}

//查看发布的帖子
export function post_user_page(data) {
  setToken();
  return axios.get(`${base}/user/page`, { params: data });
}

// 查看点赞的帖子
export function post_user_likes(data) {
  setToken();
  return axios.get(`${base}/user/likes`, { params: data });
}

// 查看收藏的帖子
export function post_user_collects(data) {
  setToken();
  return axios.get(`${base}/user/collects`, { params: data });
}

// 查看帖子
export function post_page(data) {
  return axios.get(`${base}/page`, { params: data });
}

// 点赞
export function set_likes(data) {
  setToken();
  return axios.post(`${base}/likes`, data);
}

// 收藏
export function set_collects(data) {
  setToken();
  return axios.post(`${base}/collects`, data);
}

export function post_detail(data) {
  return axios.get(`${base}/detail`, { params: data });
}
