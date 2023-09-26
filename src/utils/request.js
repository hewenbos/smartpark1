import axios from 'axios'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/api',
  timeout: 5000 // request timeout
})
import Vue from 'vue'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'
let loading
let loadingStatus = true
// 请求拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = getToken()
      loadingStatus = true
      loading = Loading.service({
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.5)'
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    if (!response.request.responseURL.includes('/login') && loadingStatus) {
      loading.close()
      loadingStatus = false
    }

    return response.data
  },
  error => {
    loading.close()
    console.log(error.response)
    if (error.response.status === 400) {
      console.log(111)
      Vue.prototype.$message({
        message: error.response.data.msg,
        type: 'error'
      })
      return
    }
    return Promise.reject(error)
  }
)

export default service
