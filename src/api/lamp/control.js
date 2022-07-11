import request from '@/utils/request'

// 查询路灯控制策略列表
export function listControl(query) {
  return request({
    url: '/lamp/control/list',
    method: 'get',
    params: query
  })
}

// 查询路灯控制策略详细
export function getControl(id) {
  return request({
    url: '/lamp/control/' + id,
    method: 'get'
  })
}

// 新增路灯控制策略
export function addControl(data) {
  return request({
    url: '/lamp/control',
    method: 'post',
    data: data
  })
}

// 修改路灯控制策略
export function updateControl(data) {
  return request({
    url: '/lamp/control',
    method: 'put',
    data: data
  })
}

// 删除路灯控制策略
export function delControl(id) {
  return request({
    url: '/lamp/control/' + id,
    method: 'delete'
  })
}
//启用策略
export function startControl(id) {
  return request({
    url: '/lamp/control/startControl/' + id,
    method: 'get'
  })
}
//停用策略
export function stopControl(id) {
  return request({
    url: '/lamp/control/stopControl/' + id,
    method: 'get'
  })
}