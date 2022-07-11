import request from '@/utils/request'

// 查询运维任务列表
export function listTask(query) {
  return request({
    url: '/yw/task/list',
    method: 'get',
    params: query
  })
}

// 查询运维任务详细
export function getTask(id) {
  return request({
    url: '/yw/task/' + id,
    method: 'get'
  })
}

// 新增运维任务
export function addTask(data) {
  return request({
    url: '/yw/task',
    method: 'post',
    data: data
  })
}

// 修改运维任务
export function updateTask(data) {
  return request({
    url: '/yw/task',
    method: 'put',
    data: data
  })
}

// 删除运维任务
export function delTask(id) {
  return request({
    url: '/yw/task/' + id,
    method: 'delete'
  })
}
