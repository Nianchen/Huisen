import request from '@/utils/request'

// 查询紧急呼叫事件列表
export function listEvent(query) {
  return request({
    url: '/call/event/list',
    method: 'get',
    params: query
  })
}

// 查询紧急呼叫事件详细
export function getEvent(id) {
  return request({
    url: '/call/event/' + id,
    method: 'get'
  })
}

// 新增紧急呼叫事件
export function addEvent(data) {
  return request({
    url: '/call/event',
    method: 'post',
    data: data
  })
}

// 修改紧急呼叫事件
export function updateEvent(data) {
  return request({
    url: '/call/event',
    method: 'put',
    data: data
  })
}

// 删除紧急呼叫事件
export function delEvent(id) {
  return request({
    url: '/call/event/' + id,
    method: 'delete'
  })
}

// 获取紧急呼叫地点信息
export function poleInfo(query) {
  return request({
    url: `/call/component/poleInfo/`,
    method: 'get',
    params: query
  })
}
