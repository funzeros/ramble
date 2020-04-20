import axios from "axios";
import storage from "@/assets/storage.js";
axios.defaults.baseURL = "/api";
const base = "/news";

function setToken() {
  let token = storage.get("TOKEN");
  axios.defaults.headers.common["token"] = token;
}

//查看发布的评论
export function news_user_page() {
  setToken();
  return axios.get(`${base}/user/page`);
}
