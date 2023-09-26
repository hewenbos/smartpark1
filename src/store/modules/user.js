import { loginAPI, getUserInfoApi } from '@/api/user'
import { setToken, removeToken, getToken } from '@/utils/auth'
export default {
  namespaced: 'name',
  state: {
    token: getToken() ? getToken() : '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    setUser(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    // 调用登录接口获取数据
    async getLogin({ commit }, loginparamse) {
      const { data } = await loginAPI({ username: loginparamse.username, password: loginparamse.password })
      console.log(data)
      commit('setToken', data.token)
    },
    // 调用获取用户信息接口
    async getUserInfo({ commit }) {
      const { data } = await getUserInfoApi()
      console.log(data)
      commit('setUser', data)
    }
  }
}
