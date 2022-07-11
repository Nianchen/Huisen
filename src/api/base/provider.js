import request from '@/utils/request'

// 查询厂商列表
export function listProvider(query) {
  return request({
    url: '/base/provider/list',
    method: 'get',
    params: query
  })
}

// 查询所有厂商列表
export function allListProvider(query) {
  return request({
    url: '/base/provider/allList',
    method: 'get',
    params: query
  })
}

// 查询厂商详细
export function getProvider(id) {
  return request({
    url: '/base/provider/' + id,
    method: 'get'
  })
}

// 新增厂商
export function addProvider(data) {
  return request({
    url: '/base/provider',
    method: 'post',
    data: data
  })
}

// 修改厂商
export function updateProvider(data) {
  return request({
    url: '/base/provider',
    method: 'put',
    data: data
  })
}

// 删除厂商
export function delProvider(id) {
  return request({
    url: '/base/provider/' + id,
    method: 'delete'
  })
}
