import request from '@/utils/request'

// 查询灯杆列表
export function listPole(query) {
  return request({
    url: '/base/pole/list',
    method: 'get',
    params: query
  })
}

export function allList(query) {
  return request({
    url: '/base/pole/allList',
    method: 'get',
    params: query
  })
}

// 查询灯杆详细
export function getPole(id) {
  return request({
    url: '/base/pole/getPoleSome/' + id,
    method: 'get'
  })
}

// 新增灯杆
export function addPole(data) {
  return request({
    url: '/base/pole',
    method: 'post',
    data: data
  })
}

// 修改灯杆
export function updatePole(data) {
  return request({
    url: '/base/pole',
    method: 'put',
    data: data
  })
}

// 删除灯杆
export function delPole(id) {
  return request({
    url: '/base/pole/' + id,
    method: 'delete'
  })
}
