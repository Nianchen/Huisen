import request from '@/utils/request'

// 查询灯头列表
export function listCap(query) {
  return request({
    url: '/lamp/cap/list',
    method: 'get',
    params: query
  })
}

// 查询灯头详细
export function getCap(id) {
  return request({
    url: '/lamp/cap/' + id,
    method: 'get'
  })
}

// 新增灯头
export function addCap(data) {
  return request({
    url: '/lamp/cap',
    method: 'post',
    data: data
  })
}

// 修改灯头
export function updateCap(data) {
  return request({
    url: '/lamp/cap',
    method: 'put',
    data: data
  })
}

// 删除灯头
export function delCap(id) {
  return request({
    url: '/lamp/cap/' + id,
    method: 'delete'
  })
}
