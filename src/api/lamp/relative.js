import request from '@/utils/request'

// 查询灯光策略关联列表
export function listRelative(query) {
  return request({
    url: '/lamp/relative/list',
    method: 'get',
    params: query
  })
}

// 查询灯光策略关联详细
export function getRelative(id) {
  return request({
    url: '/lamp/relative/' + id,
    method: 'get'
  })
}

// 新增灯光策略关联
export function addRelative(data) {
  return request({
    url: '/lamp/relative',
    method: 'post',
    data: data
  })
}

// 修改灯光策略关联
export function updateRelative(data) {
  return request({
    url: '/lamp/relative',
    method: 'put',
    data: data
  })
}

// 删除灯光策略关联
export function delRelative(id) {
  return request({
    url: '/lamp/relative/' + id,
    method: 'delete'
  })
}
