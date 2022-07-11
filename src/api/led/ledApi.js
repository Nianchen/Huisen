

import request from '@/utils/request'


// 注册led
export function addLed(query) {
  return request({
    url: '/led/component/registered',
    method: 'post',
    data:query,
  })
}

// 点播节目
export function palyProgram(data) {
  return request({
    url: '/led/program/playProgram',
    method: 'post',
    data: data,
  })
}


// 开关屏幕
export function closeProgram(data) {
  return request({
    url: '/led/component/switch',
    method: 'post',
    params:{
      ip:data.ip,
      port:data.port,
      status:data.status,
      cardNo:data.cardNo
    },
  })
}

// 获取设备列表
export function getLedList(query) {
  return request({
    url: '/led/component/list',
    method: 'get',
    params:query,
  })
}

// 获取分组数据

export function getGroupDataList(data) {
  return request({
    url: '/led/group/getGroup',
    method: 'get',
    data: data,

  })
}

// 文件上传
export function upLoadFiles(data,onUploadProgress) {
  return request({
    url: "/led/resource/upload",
    method: 'post',
    data: data,
    timeout:300000,
    onUploadProgress
  })
}

// 获取资源列表
export function getResourcess(query) {
  return request({
    url: "/led/resource/list",
    method: 'get',
    params:query,

  })
}

// 查询分组树
export function groupTree(query) {
  return request({
    url: '/led/group/groupTree',
    method: 'get',
    params: query,
  })
}


// 新增节目
export function addProgram(data) {
  return request({
    url: "/led/program/addProgram",
    method: 'post',
    data: data,
  })
}


// 查询节目列表
export function getProgramList(query) {
  return request({
    url: "/led/program/list",
    method: 'get',
    params:query,
  })
}


// 新增策略
export function addStrategy(query) {
  return request({
    url: "/led/detail/addControl",
    method: 'post',
    data:query,
  })
}

// 根据分组id查询设备
export function searchLedById(query) {
  return request({
    url: '/led/component/list',
    method: 'get',
    params:query,
  })
}


// 新增分组
export function addGroupList(data) {
  return request({
    url: '/led/group/addGroup',
    method: 'post',
    data:data,
  })
}

// 立即播放
export function playNow(data) {
  return request({
    url: '/led/program/onlinePlay',
    method: 'post',
    data:data,
  })
}

// 清除节目
export function clearProgram(data) {
  return request({
    url: '/led/program/clear',
    method: 'post',
    data:data,
  })
}

// 获取屏幕截图
export function getImg(data) {
  return request({
    url: '/led/program/getScreenshot',
    method:'post',
    data:data,
  })
}


// 查询策略列表
export function getStrategyListData(query) {
  return request({
    url: '/led/detail/getList',
    method: 'get',
    params:query,
  })
}

// 新增节目时选择图片数据
export function getEditImg(data) {
  return request({
    url: '/led/resource/getImageList',
    method: 'get',
    data:data,
  })
}

// 新增节目是选择视频数据
export function getEditVideo(data) {
  return request({
    url: '/led/resource/getVideoList',
    method: 'get',
   data:data,
  })
}

// 编辑节目的
export function editProgram(query) {
  return request({
    url: '/led/program/addLedDetail',
    method: 'post',
    data:query,
  })
}
export function updateProgram(query) {
    return request({
        url: '/led/program/updateLedDetail',
        method: 'post',
        data: query,
    })
}

// 修改树
export function editTree(data) {
  return request({
    url: '/led/group/update',
    method: 'put',
    data:data,
  })
}

// 删除数
export function delTree(data) {
  return request({
    url: '/led/group/delete/',
    method: 'post',
    data:data,
  })
}

export function delStrategy(data) {
  return request({
    url: '/led/group/delete/',
    method: 'post',
    data:data,
  })
}

// 资源分类树

// 查询树
export function resourceGroupdata(data) {
  return request({
    url: '/led/type/groupTree',
    method: 'get',
    data:data,
  })
}

// 新增资源树
export function addresourceGroup(data) {
  return request({
    url: '/led/type/addResource',
    method: 'post',
    data:data,
  })
}

// 修改资源树
export function updateresourceGroup(data) {
  return request({
    url: '/led/type/updateResource',
    method: 'post',
    data:data,
  })
}
// 删除资源树
export function delresourceGroup(data) {
  return request({
    url: '/led/type/delete',
    method: 'post',
    data:data,
  })
}


// 修改策略
export function updateStrategy(query) {
  return request({
    url: '/led/detail/updateControl',
    method: 'post',
    data:query,
  })
}

// 根据分组id查询资源
export function selectResourceById(query) {
  return request({
    url: '/led/resource/list',
    method: 'get',
    params:query,
  })
}

// 根据id删除策略
export function delStrategydata(data) {
  return request({
    url: '/led/detail/deleteControl',
    method: 'post',
    data:data,
  })
}

// 查看节目详情
export function selectDetailProgram(data) {
  return request({
    url: '/led/program/getInfo',
    method: 'post',
    data:data,
  })
}

// 通过审核
export function successAudit(data) {
  return request({
    url: '/led/program/reviewProgram',
    method: 'post',
    data:data,
  })
}

// 获取该灯杆下的详细信息
export function getLedDetail(data) {
    return request({
        url: '/led/detail/getControl',
        method: 'post',
        data: data,
    })
}


export function fliterLedComponent(query) {
    return request({
        url: '/led/component/rightGroup',
        method: 'get',
        params: query
    })
}

export function ledAllList(query) {
    return request({
        url: '/led/component/allList',
        method: 'get',
        params: query,
    })
}
export function moveInLedGroup(id) {
    return request({
        url: '/led/component/moveInGroup/' + id,
        method: 'get'
    })
}
//设备移出分组
export function moveOutLedGroup(id) {
    return request({
        url: '/led/component/moveOutGroup/' + id,
        method: 'get'
    })
}

export function deleteProgram(data){
  return request({
    url:'/led/program/deleteProgram',
    method:'POST',
    data:data
  })
}

export function ledDetail(id){
  return request({
    url:'/led/component/' + id,
    method:'get'
  })
}

export function proviewProgram(data){
  return request({
    url:'/led/program/previewProgram',
    method: 'post',
    data:data
  })
}
export function proviewClear(data){
  return request({
    url:'/led/program/previewClear',
    method: 'post',
    data:data
  })
}

export function playProgramDetail(data){
  return request({
    url:'/led/program/playProgramDetail',
    method: 'post',
    data:data
  })
}


