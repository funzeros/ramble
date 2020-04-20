import axios from "axios";
import storage from "@/assets/storage.js";
axios.defaults.baseURL = "/api";
const base = "/comments";

function setToken() {
  let token = storage.get("TOKEN");
  axios.defaults.headers.common["token"] = token;
}

//查看发布的评论
export function comments_user_page(data) {
  setToken();
  return axios.get(`${base}/user/page`, { params: data });
}
// 发布评论
export function comments_create(data) {
  setToken();
  return axios.post(`${base}/create`, data);
}

//删除评论
export function comments_user_delete(data) {
  return axios.get(`${base}/user/delete`, { params: data });
}
