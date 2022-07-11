import request from '@/utils/request'

// 查询紧急呼叫分组列表
export function listGroup(query) {
  return request({
    url: '/call/group/list',
    method: 'get',
    params: query
  })
}

// 查询紧急呼叫分组详细
export function getGroup(id) {
  return request({
    url: '/call/group/' + id,
    method: 'get'
  })
}

// 新增紧急呼叫分组
export function addGroup(data) {
  return request({
    url: '/call/group',
    method: 'post',
    data: data
  })
}

// 修改紧急呼叫分组
export function updateGroup(data) {
  return request({
    url: '/call/group',
    method: 'put',
    data: data
  })
}

// 删除紧急呼叫分组
export function delGroup(id) {
  return request({
    url: '/call/group/' + id,
    method: 'delete'
  })
}

// 查询分组树
export function groupTree(query) {
  return request({
    url: '/call/group/groupTree',
    method: 'get',
    params: query
  })
}
