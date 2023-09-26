import request from '@/utils/request'

// 获取楼宇
export const getParkBudingApi = (data) => {
  return request({
    url: `/park/building?page=${data.page}&pageSize=${data.pageSize}&name=${data.name}`
  })
}

// 添加楼宇
export const getAddParkBudingApi = (data) => {
  return request({
    url: '/park/building',
    method: 'POST',
    data
  })
}

// 编辑楼宇
export const getEditParkBudingApi = (data) => {
  return request({
    url: '/park/building',
    method: 'PUT',
    data
  })
}

// 删除楼宇
export const getDelParkBudingApi = (id) => {
  return request({
    url: `/park/building/${id}`,
    method: 'DELETE'
  })
}
