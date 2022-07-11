import request from '@/utils/request'

// 查询基础组件列表
export function listComponent(query) {
  return request({
    url: '/base/component/list',
    method: 'get',
    params: query
  })
}

// 查询基础组件详细
export function getComponent(id) {
  return request({
    url: '/base/component/' + id,
    method: 'get'
  })
}

export function getProviderModelData(query) {
  return request({
    url: '/base/component/getProviderModel/',
    method: 'get',
    params: query
  })
}

// 新增基础组件
export function addComponent(data) {
  return request({
    url: '/base/component',
    method: 'post',
    data: data
  })
}

// 修改基础组件
export function updateComponent(data) {
  return request({
    url: '/base/component',
    method: 'put',
    data: data
  })
}

// 删除基础组件
export function delComponent(id) {
  return request({
    url: '/base/component/' + id,
    method: 'delete'
  })
}
