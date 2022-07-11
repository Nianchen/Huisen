import request from '@/utils/request'

// 查询运维工单列表
export function listEvent(query) {
  return request({
    url: '/yw/event/list',
    method: 'get',
    params: query
  })
}

// 查询运维工单详细
export function getEvent(id) {
  return request({
    url: '/yw/event/' + id,
    method: 'get'
  })
}

// 新增运维工单
export function addEvent(data) {
  return request({
    url: '/yw/event',
    method: 'post',
    data: data
  })
}

// 修改运维工单
export function updateEvent(data) {
  return request({
    url: '/yw/event',
    method: 'put',
    data: data
  })
}

// 删除运维工单
export function delEvent(id) {
  return request({
    url: '/yw/event/' + id,
    method: 'delete'
  })
}
