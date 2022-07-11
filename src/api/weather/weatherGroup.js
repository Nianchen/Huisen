import request from '@/utils/request'

// 查询气象分组列表
export function listWeatherGroup(query) {
  return request({
    url: '/weather/weatherGroup/list',
    method: 'get',
    params: query
  })
}

// 查询气象分组详细
export function getWeatherGroup(id) {
  return request({
    url: '/weather/weatherGroup/' + id,
    method: 'get'
  })
}

// 查询分组树
export function groupTree(query) {
  return request({
    url: '/weather/weatherGroup/groupTree',
    method: 'get',
    params: query
  })
}

// 新增气象分组
export function addWeatherGroup(data) {
  return request({
    url: '/weather/weatherGroup',
    method: 'post',
    data: data
  })
}

// 修改气象分组
export function updateWeatherGroup(data) {
  return request({
    url: '/weather/weatherGroup',
    method: 'put',
    data: data
  })
}

// 删除气象分组
export function delWeatherGroup(id) {
  return request({
    url: '/weather/weatherGroup/' + id,
    method: 'delete'
  })
}
//分组移入设备
export function moveInWeatherGroup(id) {
  return request({
    url: '/weather/weatherComponent/moveInGroup/' + id,
    method: 'get'
  })
}
//设备移出分组
export function moveOutWeatherGroup(id) {
  return request({
    url: '/weather/weatherComponent//moveOutGroup/' + id,
    method: 'get'
  })
}
