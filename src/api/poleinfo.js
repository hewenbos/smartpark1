import request from '@/utils/request'

// 获取一体杆列表
export const getPoleInfoListApi = (data) => {
  return request({
    url: `/pole/info/list?page=${data.page}&pageSize=${data.pageSize}&poleName=${data.poleName || ''}&poleNumber=${data.poleNumber || ''}&poleStatus=${data.poleStatus || ''}`
  })
}

// 删除一体杆

export const getDelPoleInfoApi = (id) => {
  return request({
    url: `/pole/info/${id}`,
    method: 'DELETE'
  })
}

// 获取关联区域

export const getParkingDropListApi = () => {
  return request({
    url: '/parking/area/dropList'
  })
}

// 添加一体杆

export const getAddPoleApi = (data) => {
  return request({
    url: '/pole/info',
    method: 'POST',
    data
  })
}

// 编辑一体杆

export const getEditPoleApi = (data) => {
  return request({
    url: '/pole/info',
    method: 'PUT',
    data
  })
}

// 获取告警记录

export const getPoleWaringApi = (data) => {
  return request({
    url: `/pole/warning/list?page=${data.page}&pageSize=${data.pageSize}&poleName=${data.poleName || ''}&poleNumber=${data.poleNumber || ''}&handleStatus=${data.poleStatus || ''}`
  })
}

// 删除告警记录

export const getDelPoleApi = (id) => {
  return request({
    url: '/pole/warning/' + id,
    method: 'DELETE'
  })
}

// 查看告警详情

export const getPoleDetailApi = (id) => {
  return request({
    url: '/pole/warning/' + id
  })
}
