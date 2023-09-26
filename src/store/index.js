import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)
import getters from './getters'
const store = new Vuex.Store({
  // 组合模块的配置项
  modules: {
    user
  },
  getters
})

export default store
