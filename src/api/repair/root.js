import request from '@/utils/request'

export function listRepair(query) {
  return request({
    url: '/data',
    method: 'get',
    params: query,
    baseURL: 'https://www.fastmock.site/mock/fa3d23c8a59dc3f8e19142553fbf029c/test1'
  })
}
export function listFault(query) {
  return request({
    url: '/fault',
    method: 'get',
    params: query,
    baseURL: 'https://www.fastmock.site/mock/fa3d23c8a59dc3f8e19142553fbf029c/test1'
  })
}