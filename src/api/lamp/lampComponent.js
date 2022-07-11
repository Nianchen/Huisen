import request from '@/utils/request'

// 查询灯光组件列表
export function listLampComponent(query) {
  return request({
    url: '/lamp/lampComponent/list',
    method: 'get',
    params: query
  })
}
export function listAllLampComponent(query) {
  return request({
    url: '/lamp/lampComponent/allList',
    method: 'get',
    params: query
  })
}

//分组管理过滤组件
export function fliterLampComponent(query) {
  return request({
    url: '/lamp/lampComponent/rightGroup',
    method: 'get',
    params: query
  })
}

// 查询灯光组件详细
export function getLampComponent(id) {
  return request({
    url: '/lamp/lampComponent/' + id,
    method: 'get'
  })
}

// 新增灯光组件
export function addLampComponent(data) {
  return request({
    url: '/lamp/lampComponent',
    method: 'post',
    data: data
  })
}

// 修改灯光组件
export function updateLampComponent(data) {
  return request({
    url: '/lamp/lampComponent',
    method: 'put',
    data: data
  })
}

// 删除灯光组件
export function delLampComponent(id) {
  return request({
    url: '/lamp/lampComponent/' + id,
    method: 'delete'
  })
}

