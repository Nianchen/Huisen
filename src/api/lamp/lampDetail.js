import request from '@/utils/request'

// 查询路灯控制策略明细列表
export function listLampDetail(query) {
  return request({
    url: '/lamp/lampDetail/list',
    method: 'get',
    params: query
  })
}

// 查询路灯控制策略明细详细
export function getLampDetail(id) {
  return request({
    url: '/lamp/lampDetail/' + id,
    method: 'get'
  })
}

// 新增路灯控制策略明细
export function addLampDetail(data) {
  return request({
    url: '/lamp/lampDetail',
    method: 'post',
    data: data
  })
}

// 修改路灯控制策略明细
export function updateLampDetail(data) {
  return request({
    url: '/lamp/lampDetail',
    method: 'put',
    data: data
  })
}

// 删除路灯控制策略明细
export function delLampDetail(id) {
  return request({
    url: '/lamp/lampDetail/' + id,
    method: 'delete'
  })
}
