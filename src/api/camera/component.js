 /**
 * @project ruoyi-ui
 * @fileName component.js
 * @author JiangHongxu
 * @date 2021/4/13 15:12
 */
import request from '@/utils/request'

// 查询视频监控组件列表
export function listComponent(query) {
    return request({
        url: '/camera/component/list',
        method: 'get',
        params: query
    })
}

 export function listAllComponent(query) {
   return request({
     url: '/camera/component/allList',
     method: 'get',
     params: query
   })
 }

//分组管理过滤视频组件
export function fliterListComponent(query) {
    return request({
        url: '/camera/component/rightGroup',
        method: 'get',
        params: query
    })
}
// 查询视频监控组件详细
export function getComponent(id) {
    return request({
        url: '/camera/component/' + id,
        method: 'get'
    })
}

// 新增视频监控组件
export function addCameraComponent(data) {
    return request({
        url: '/camera/component',
        method: 'post',
        data: data,
    })
}

// 修改视频监控组件
export function updateComponent(data) {
    return request({
        url: '/camera/component',
        method: 'put',
        data: data
    })
}

// 删除视频监控组件
export function delComponent(id) {
    return request({
        url: '/camera/component/' + id,
        method: 'delete'
    })
}
