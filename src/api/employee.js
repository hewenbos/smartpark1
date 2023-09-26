import request from '@/utils/request'

export const getEmployeeApi = (data) => {
  return request({
    url: `/park/sys/user?name=${data.name || ''}&page=${data.page}&pageSize=${data.pageSize}`
  })
}
