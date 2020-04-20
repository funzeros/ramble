import Vue from "vue";
import Vuex from "vuex";
import login from "./login/index";
import main from "./main/index";
import post from "./post/index";
import { url } from "@/api/ws";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    logoColor: "#86cce8",
    userInfo: {},
    msgP: false,
    chatList: [],
    chatMembers: [],
    url: url,
    ws: {},
  },
  mutations: {},
  actions: {
    userOnLine({ state }) {
      //创建webserve连接
      // console.log(state.url, state.userInfo);
      state.ws = new WebSocket(state.url);
      state.ws.onopen = () => {
        // console.log(state.ws);
        state.ws.send(
          `{"name":"${state.userInfo.nickname}","id":"${state.userInfo.id}","body":"上线啦","type":"0"}`
        );
      };
    },
  },
  modules: {
    login,
    main,
    post,
  },
});
