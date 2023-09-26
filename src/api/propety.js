import request from '@/utils/request'

// 获取物业费列表

export const getProPetyApi = (data) => {
  return request({
    url: `/park/propertyfee?enterpriseName=${data.enterpriseName}&start=${data.start}&end=${data.end}&page=${data.page}&pageSize=${data.pageSize}`,
    method: 'GET'
  })
}

// 删除

export const getDelPropetyApi = (id) => {
  return request({
    url: '/park/propertyfee/' + id,
    method: 'DELETE'
  })
}

// 查询所有企业

export const getAllPropetyEnterpriseApi = () => {
  return request({
    url: '/park/all/enterprise'
  })
}

// 查询所有楼宇

export const getAllPropetyBudingApi = () => {
  return request({
    url: '/park/all/building'
  })
}

// 预算金额

export const getPropertyfeepaymentApi = (data) => {
  return request({
    url: '/park/propertyfee/pre/payment',
    method: 'POST',
    data
  })
}

// 添加物业费

export const getAddPropetyApi = (data) => {
  return request({
    url: '/park/propertyfee',
    method: 'POST',
    data
  })
}

// 查看账单详情

export const getLookDetailPropetyApi = (id) => {
  return request({
    url: '/park/propertyfee/' + id
  })
}
