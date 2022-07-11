import request from '@/utils/request'

// 查询紧急呼叫组件列表
export function listComponent(query) {
  return request({
    url: '/call/component/list',
    method: 'get',
    params: query
  })
}

export function allListComponent(query) {
  return request({
    url: '/call/component/allList',
    method: 'get',
    params: query
  })
}

// 查询紧急呼叫组件详细
export function getComponentCall(id) {
  return request({
    url: '/call/component/' + id,
    method: 'get'
  })
}

// 新增紧急呼叫组件
export function addComponent(data) {
  return request({
    url: '/call/component',
    method: 'post',
    data: data
  })
}


export function addWarning(query) {
  return request({
    url:'/call/component',
    method:'post',
    data:query,

  })
}

// 修改紧急呼叫组件
export function updateComponent(data) {
  return request({
    url: '/call/component',
    method: 'put',
    data: data
  })
}

// 删除紧急呼叫组件
export function delComponent(id) {
  return request({
    url: '/call/component/' + id,
    method: 'delete'
  })
}


// 测试一键报警
export function testWarning(query) {
  return request({
    url:'/test/call',
    method:'post',
    data:query
  })
}



