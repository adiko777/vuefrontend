import Vue from 'vue'
import Vuex from 'vuex'
//modules
import user from './modules/user/user'
import application from "./modules/application/application";

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    application
  }
})
