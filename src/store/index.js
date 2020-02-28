import Vue from 'vue'
import Vuex from 'vuex'
import login from './login/index'
import main from './main/index'
import post from './post/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logoColor:"#86cce8"
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    main,
    post
  }
})
