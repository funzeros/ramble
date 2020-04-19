import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vant from "vant";
import "vant/lib/index.css";
import "@/assets/iconfont/iconfont.css";
import Router from "vue-router";
import storage from "@/assets/storage.js";
// 防路由警告
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Vant);
Vue.config.productionTip = false;
// axios写入原型
Vue.prototype.$axios = axios;
// 图片预览
import { ImagePreview } from "vant";
Vue.prototype.$imagePreview = ImagePreview;

//图片懒加载
import { Lazyload } from "vant";

Vue.use(Lazyload);

Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.prototype.$storage = storage;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
