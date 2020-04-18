import axios from "axios";
// import qs from "qs";
import storage from "@/assets/storage.js";

axios.defaults.timeout = 30000;

// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

// HTTPrequest拦截
axios.interceptors.request.use(
  (config) => {
    let token = storage.get("TOKEN");
    console.log(token);
    axios.defaults.headers.common["token"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
