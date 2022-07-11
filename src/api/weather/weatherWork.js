import request from '@/utils/request'

// 查询气象监测工作状态列表
export function listWeatherWork(query) {
  return request({
    url: '/weather/weatherWork/list',
    method: 'get',
    params: query
  })
}

// 查询气象监测工作状态详细
export function getWeatherWork(id) {
  return request({
    url: '/weather/weatherWork/' + id,
    method: 'get'
  })
}

// 新增气象监测工作状态
export function addWeatherWork(data) {
  return request({
    url: '/weather/weatherWork',
    method: 'post',
    data: data
  })
}

// 修改气象监测工作状态
export function updateWeatherWork(data) {
  return request({
    url: '/weather/weatherWork',
    method: 'put',
    data: data
  })
}

// 删除气象监测工作状态
export function delWeatherWork(id) {
  return request({
    url: '/weather/weatherWork/' + id,
    method: 'delete'
  })
}
