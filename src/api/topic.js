import axios from "axios";
import storage from "@/assets/storage.js";
axios.defaults.baseURL = "/api";
const base = "/topic";

function setToken() {
  let token = storage.get("TOKEN");
  axios.defaults.headers.common["token"] = token;
}
//查看话题
export function get_topic() {
  return axios.get(`${base}/page`);
}
