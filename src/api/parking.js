import request from '@/utils/request'

// 获取区域管理数据
export const getParkingAreaApi = (data) => {
  return request({
    url: `/parking/area/list?page=${data.page}&pageSize=${data.pageSize}`
  })
}

// 获取关联计费
export const getParkingRuleApi = () => {
  return request({ url: '/parking/rule/list' })
}

// 添加区域

export const getAddParkingApi = (data) => {
  return request({
    url: '/parking/area',
    method: 'POST',
    data
  })
}

// 编辑区域
export const getEditParkingApi = (data) => {
  return request({
    url: '/parking/area',
    method: 'PUT',
    data
  })
}

// 删除区域
export const getDelParkingApi = (id) => {
  return request({
    url: `/parking/area/${id}`,
    method: 'DELETE'
  })
}

// 获取月卡列表
export const getParkingCardApi = (data) => {
  console.log(data)
  return request({
    url: `/parking/card/list?page=${data.page}&pageSize=${data.pageSize}&carNumber=${data.carNumber}&cardStatus=${data.cardStatus}&personName=${data.personName}`
  })
}

// 添加月卡
export const getAddParkingCarApi = (data) => {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}

// 获取月卡详情
export const getDetailParkingApi = (id) => {
  return request({
    url: '/parking/card/detail/' + id
  })
}

// 编辑月卡
export const getEditParkingCartApi = (data) => {
  return request({
    url: '/parking/card/edit',
    method: 'PUT',
    data
  })
}

// 删除月卡
export const getDelParkingCartApi = (id) => {
  return request({
    url: '/parking/card/' + id,
    method: 'DELETE'
  })
}

// 获取查看详情

export const getLookDetailParkingCardApi = (id) => {
  return request({
    url: '/parking/card/' + id
  })
}

// 续费
export const getRechargeParkingCarApi = (data) => {
  return request({
    url: '/parking/card/recharge',
    method: 'POST',
    data
  })
}

// 月卡占有率
export const getProportionApi = () => {
  return request({
    url: '/parking/card/proportion'
  })
}

// 获取缴费管理数据

export const getParkingPayMentApi = (data) => {
  return request({
    url: `/parking/payment/list?page=${data.page}&pageSize=${data.pageSize}&carNumber=${data.carNumber}&paymentStatus=${data.paymentStatus}`
  })
}

// 获取计费规则数据
export const getParkingRuleListApi = (data) => {
  return request({
    url: `/parking/rule/list?page=${data.page}&pageSize=${data.pageSize}`
  })
}

// 删除计费规则
export const getDelParkingRuleApi = (id) => {
  return request({
    url: '/parking/rule/' + id,
    method: 'DELETE'
  })
}

// 添加计费规则
export const getAddParkingRuleApi = (data) => {
  return request({
    url: '/parking/rule',
    method: 'POST',
    data
  })
}

// 编辑计费规则

export const getEditParkingRuleApi = (data) => {
  return request({
    url: '/parking/rule',
    method: 'PUT',
    data
  })
}

// 获取计费详情
export const getDetailParkingRuleApi = (id) => {
  return request({
    url: '/parking/rule/' + id
  })
}
