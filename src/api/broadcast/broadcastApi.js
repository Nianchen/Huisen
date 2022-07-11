
import request from '@/utils/request'
//新增歌曲
export function addMusic(data) {
  return request({
    url:'/broadcast/component',
    method: 'post',
    data: data,

  })
}

//新增广播前的测试
export function testBroadCast(query) {
  return request({
    url: '/broadcast/component/test',
    method: 'post',
    data:query,

  })
}

//新增广播
export function addBroadCast(query) {
  return request({
    url: '/broadcast/component/register',
    method: 'post',
    data:query,

  })
}


// 点播
export function playMusic(data) {
  return request({
    url: '/broadcast/component/playMusic',
    method: 'post',
    data: data,

  })
}

export function getMusicList(query) {
  return request({
    url: '/broadcast/musiclist/list',
    method: 'get',
    params:query,

  })
}

// 获取广播id
export function getBroadCastList(data) {
  return request({
    url: '/broadcast/component/terminalIDList',
    method: 'post',
    data: data,
  })
}

// 暂停
export function stopMusic(data) {
  return request({
    url: '/broadcast/component/stopMusic',
    method: 'post',
    // params: {
    //   taskId:data.taskId
    // },
    data: data,

  })
}


//获取音柱列表
export function getBCListData(query) {
  return request({
    url: '/broadcast/component/list',
    method: 'get',
    params:query,

  })
}


// 获取分组
export function getGroupListData(data) {
  return request({
    url: '/broadcast/group/list',
    method: 'get',
    data: data,

  })
}

// 获取分组下的列表
export function getGroupListInfo(query) {
  return request({
    url: '/broadcast/group/getInfo',
    method: 'get',
    params:query,

  })
}

// 新增分组
export function addGroupList(data) {
  return request({
    url: '/broadcast/group/add',
    method: 'post',
    data: data,

  })
}

// 修改分组
export function updateGroupList(data) {
  return request({
    url: '/broadcast/group/edit',
    method: 'put',
    data: data,

  })
}

// 删除分组
export function delGroupList(id) {
  return request({
    url: '/broadcast/group/remove/' + id,
    method: 'delete',

  })
}

// 获取token
export function getBroadToken(data) {
  return request({
    url: '/broadcast/component/token',
    method: 'get',
    data: data,

  })
}


// 查询音乐列表
export function searchMusicList(data) {
  return request({
    url: '/broadcast/musiclist/getInfo',
    method: 'post',
    data: data,

  })
}

// 查询分组树
export function groupTree(query) {
  return request({
    // url: '/broadcast/group/groupTree',
    url: '/broadcast/group/groupTree',
    method: 'get',
    params: query,

  })
}


// 获取策略列表

export function getStrategyData(query) {
  return request({
    url: '/broadcast/control/list',
    method: 'get',
    params: query,

  })
}

// 编辑策略

export function editStrategyData(data) {
  return request({
    url: '/broadcast/control/edit',
    method: 'put',
    data: data,

  })
}

// 新增策略
export function addStrategyData(data) {
  return request({
    url: '/broadcast/control/add',
    method: 'post',
    data: data,

  })
}

// 人工广播
export function beginBroadCast(data) {
  return request({
    url: '/broadcast/control/manualBroadcast',
    method: 'post',
    data: data,

  })
}


//根据id查寻策略详情
export function searchStrategyDetail(data) {
  return request({
    url: '/broadcast/control/getList',
    method:'post',
    data: data,

  })
}
// 删除详情
export function delStrategy(id) {
  return request({
    url: '/broadcast/control/remove/'+id,
    method: 'delete',

  })
}

// 修改策略状态
export function updateStrategystatus(data) {
  return request({
    url: '/broadcast/control/updataStatus',
    method: 'put',
    data:data,

  })
}

// 调音量
export function updateVolume(data) {
    return request({
        url: '/broadcast/control/controlServerMusic',
        method: 'post',
        data: data,

    })
}

export function fliterBroadcastComponent(query) {
    return request({
        url: '/broadcast/component/rightGroup',
        method: 'get',
        params: query,
    })
}

export function moveInBroadcastGroup(id) {
    return request({
        url: '/broadcast/component/moveInGroup/' + id,
        method: 'get',
    })
}
//设备移出分组
export function moveOutBroadcastGroup(id) {
    return request({
        url: '/broadcast/component/moveOutGroup/' + id,
        method: 'get',
    })
}
// 查询所有设备(map用)
export function getBCAllListData() {
    return request({
        url: '/broadcast/component/allList',
        method: 'get',
    })
}

// 试听播放
export function startMusic(data){
  return request({
    url: '/broadcast/component/preview',
    method: 'post',
    data: data
  })
}

export function changeMusicVolume(data){
  return request({
    url:'/broadcast/control/previewVolume',
    method: 'post',
    data:data
  })
}

export function stopMusci(data){
  return request({
    url: '/broadcast/component/stopMusic',
    method: 'post',
    data:data
  })
}

export function broDetail(id){
  return request({
    url: '/broadcast/component/' + id,
    method: 'get',
  })
}

export function previewListen(data){
  return request({
    url:'/broadcast/component/previewListen',
    method:'post',
    data:data
  })
}
