import request from '@/utils/request'

// 查询气象组件列表
export function listWeatherComponent(query) {
  return request({
    url: '/weather/weatherComponent/list',
    method: 'get',
    params: query
  })
}

export function weatherAllList(query) {
  return request({
    url: '/weather/weatherComponent/allList',
    method: 'get',
    params: query
  })
}

// 查询气象组件详细
export function getWeatherComponent(id) {
  return request({
    url: '/weather/weatherComponent/' + id,
    method: 'get'
  })
}

// 新增气象组件
export function addWeatherComponent(data) {
  return request({
    url: '/weather/weatherComponent',
    method: 'post',
    data: data,
    // baseURL:'http://192.168.3.46:9333'
  })
}

// 修改气象组件
export function updateWeatherComponent(data) {
  return request({
    url: '/weather/weatherComponent',
    method: 'put',
    data: data
  })
}

// 删除气象组件
export function delWeatherComponent(id) {
  return request({
    url: '/weather/weatherComponent/' + id,
    method: 'delete'
  })
}
//设备过滤
export function fliterWeatherComponent(query) {
  return request({
    url: '/weather/weatherComponent/rightGroup',
    method: 'get',
    params: query
  })
}