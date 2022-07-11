import request from '@/utils/request'

// 查询分组列表
export function listLampGroup(query) {
  return request({
    url: '/lamp/lampGroup/list',
    method: 'get',
    params: query
  })
}

// 查询分组列表
export function listLampGroupTree(query) {
  return request({
    url: '/lamp/lampGroup/groupTree',
    method: 'get',
    params: query
  })
}

// 查询分组详细
export function getLampGroup(id) {
  return request({
    url: '/lamp/lampGroup/' + id,
    method: 'get'
  })
}

// 新增分组
export function addLampGroup(data) {
  return request({
    url: '/lamp/lampGroup',
    method: 'post',
    data: data
  })
}

// 修改分组
export function updateLampGroup(data) {
  return request({
    url: '/lamp/lampGroup',
    method: 'put',
    data: data
  })
}

// 删除分组
export function delLampGroup(id) {
  return request({
    url: '/lamp/lampGroup/' + id,
    method: 'delete'
  })
}
//分组移入设备
export function moveInLampGroup(id) {
  return request({
    url: '/lamp/lampComponent/moveInGroup/' + id,
    method: 'get'
  })
}
//设备移出分组
export function moveOutLampGroup(id) {
  return request({
    url: '/lamp/lampComponent/moveOutGroup/' + id,
    method: 'get'
  })
}