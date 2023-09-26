import request from '@/utils/request'

// 获取园区数据 和 年度收入统计
export const getParkdataApi = () => {
  return request({
    url: '/home/workbench/info',
    method: 'GET'
  })
}

// 获取临期合同数据
export const getRentInfoApi = (data) => {
  return request({
    url: `/home/workbench/rentInfo?page=${data.page}&pageSize=${data.pageSize}`,
    method: 'GET'
  })
}
