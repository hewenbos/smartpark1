import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 */
export function loginAPI(data) {
  return request({
    url: '/park/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: '/park/user/profile',
    method: 'GET'
  })
}
