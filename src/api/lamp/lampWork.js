import request from '@/utils/request'

// 查询灯光工作状态列表
export function listLampWork(query) {
  return request({
    url: '/lamp/lampWork/list',
    method: 'get',
    params: query
  })
}

// 查询灯光工作状态详细
export function getLampWork(id) {
  return request({
    url: '/lamp/lampWork/' + id,
    method: 'get'
  })
}

// 新增灯光工作状态
export function addLampWork(data) {
  return request({
    url: '/lamp/lampWork',
    method: 'post',
    data: data
  })
}

// 修改灯光工作状态
export function updateLampWork(data) {
  return request({
    url: '/lamp/lampWork',
    method: 'put',
    data: data
  })
}

// 删除灯光工作状态
export function delLampWork(id) {
  return request({
    url: '/lamp/lampWork/' + id,
    method: 'delete'
  })
}
