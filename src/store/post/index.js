import axios from "axios";
export default {
  namespaced: true,
  state: {
    newPosts: {
      total: 0,
      topic: [],
      posts: [],
    },
    recPosts: {
      total: 0,
      topic: [],
      posts: [],
    },
    curSwtich: 0, // 当前是最新页还是热门页 0 -> 最新 1 -> 热门
    nScrollY: 0, // 最新页的滚动高度
    rScrollY: 0, // 热门页的滚动高度
  },
  mutations: {
    setNewPosts(state, data) {
      // 将获取到的帖子数据复制给状态
      state.newPosts = data;
    },
    setRecPosts(state, data) {
      // 将获取到的帖子数据复制给状态
      state.recPosts = data;
    },
    setScrollY(state, data) {
      if (data.type) {
        state.rScrollY = data.scrollY;
      } else {
        state.nScrollY = data.scrollY;
      }
    },
    setCurSwtich(state, data) {
      state.curSwtich = data;
    },
  },
  actions: {
    async getNewPosts({ commit }) {
      console.log("获取最新帖子中");
      let result = await axios.get("../../mock/newPost.json");
      // console.log(result);
      commit("setNewPosts", result.data.data);
    },
    async getRecPosts({ commit }) {
      console.log("获取最新帖子中");
      let result = await axios.get("../../mock/newPost.json");
      // console.log(result);
      commit("setRecPosts", result.data.data);
    },
    getCurSwtich({ commit }, data) {
      commit("setCurSwtich", data);
    },
    getScrollY({ commit }, data) {
      commit("setScrollY", data);
    },
  },
};
