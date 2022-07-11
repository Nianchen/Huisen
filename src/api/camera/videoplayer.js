/**
 * @project ruoyi-ui
 * @fileName videoplayer.js
 * @author JiangHongxu
 * @date 2021/3/28 14:42
 */
import request from '@/utils/request'

export function videoUrl(query) {
  return request({
    url: '/stream/camera',
    method: 'get',
    params: query,
  })
}

export function alarmVideoUrl(query) {
  return request({
    url: '/stream/call',
    method: 'get',
    params: query,
  })
}

export function stopVideo(query) {
  return request({
    url: '/stream/stop',
    method: 'get',
    params: query,
  })
}

export function videoRecord(query) {
  return request({
    url: '/stream/record',
    method: 'get',
    params: query,
  })
}
