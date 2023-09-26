import router from './router'
import { getToken } from './utils/auth'
const whiteList = ['/404']
import store from './store'
router.beforeEach(async(to, form, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next('/login?fullpath=' + to.path)
      }
    }
  }
})

