import request from '@/utils/request'


export function listCamera(query) {
  return request({
    url: '/camera/group/list',
    method: 'get',
    params: query
  })
}


export function listFault(query) {
  return request({
    url: '/listFault',
    method: 'get',
    params: query,
    baseURL: 'https://www.fastmock.site/mock/b32d868559e4290509e09597ce48eb06/api_v1'
  })
}

export function listStatus(query) {
  return request({
    url: '/camera/component/status',
    method: 'get',
    params: query,
  })
}

// 查询分组树
export function groupTree(query) {
  return request({
    url: '/camera/group/groupTree',
    method: 'get',
    params: query
  })
}

// 查询分组 + 摄像头树
export function groupCameraTree(query) {
  return request({
    url: '/camera/group/groupCameraTree',
    method: 'get',
    params: query
  })
}

// 查询区域 + 摄像头树
export function deptCameraTree(query) {
  return request({
    url: '/camera/group/deptCameraTree',
    method: 'get',
    params: query
  })
}

// 新增分组
export function addCameraGroup(data) {
  return request({
    url: '/camera/group',
    method: 'post',
    data: data
  })
}

// 修改分组
export function updateCameraGroup(data) {
  return request({
    url: '/camera/group',
    method: 'put',
    data: data
  })
}

// 删除分组
export function delCameraGroup(id) {
  return request({
    url: '/camera/group/' + id,
    method: 'delete'
  })
}

// 分组移入移出
export function cameraAllList(query) {
  return request({
      url: '/camera/component/allList',
      method: 'get',
      params: query,
  })
}
export function moveInCameraGroup(id) {
  return request({
      url: '/camera/component/moveInGroup/' + id,
      method: 'get'
  })
}
//设备移出分组
export function moveOutCameraGroup(id) {
  return request({
      url: '/camera/component/moveOutGroup/' + id,
      method: 'get'
  })
}

