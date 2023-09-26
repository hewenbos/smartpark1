import request from '@/utils/request'
// 获取用户数据
export const getEmployeeApi = (data) => {
  return request({
    url: `/park/sys/user?name=${data.name || ''}&page=${data.page}&pageSize=${data.pageSize}`
  })
}

// 删除用户

export const getDEmployeeApi = (id) => {
  return request({
    url: '/park/sys/user/' + id,
    method: 'DELETE'
  })
}

// 重置密码

export const getCancelEmployeeApi = (data) => {
  return request({
    url: '/park/sys/user/resetPwd',
    method: 'PUT',
    data
  })
}

// 添加用户

export const getAddEmployeeApi = (data) => {
  return request({
    url: '/park/sys/user',
    method: 'POST',
    data
  })
}

// 查询所有角色

export const getSearchRuleApi = () => {
  return request({
    url: '/park/sys/role'

  })
}

// 编辑用户
export const getEditEmployeeApi = (data) => {
  return request({
    url: '/park/sys/user',
    method: 'PUT',
    data
  })
}

// 权限树形

export const getTreeEmployeeApi = () => {
  return request({
    url: '/park/sys/permision/all/tree'

  })
}

// 获取已有权限

export const getRoleSysApi = (id) => {
  return request({
    url: '/park/sys/role/' + id || ''
  })
}

// 获取成员

export const getRoleUserApi = (data) => {
  return request({
    url: `/park/sys/roleUser/${data.id || ''}?page=${data.page}&pageSize=${data.pageSize}`
  })
}
