import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout';
import Camera from '@/views/camera';
import Led from '@/views/led'
import Broadcast from '@/views/broadcast'
import Yw from '@/views/yw'
import Alarm from '@/views/alarm'
import App from '@/views/app'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/app/:token/:ip/:id',
    component: (resolve) => require(['@/views/app'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: 'index'
  },
  {
    path: '/index',
    component: (resolve) => require(['@/views/index'], resolve),
    name: '首页',
    meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true},
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: {title: '个人中心', icon: 'user'}
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: {title: '字典数据', icon: ''}
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: {title: '调度日志'}
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: {title: '修改生成配置'}
      }
    ]
  }, {
    path: '/camera',
    component: Camera,
    hidden: true,
    redirect: '/camera/group',
    children: [
      {
        path: 'group',
        component: (resolve) => require(['@/views/camera/group/index'], resolve),
      },
    ]
  },
  {
    path: '/alarm',
    component: Alarm,
    hidden: true,
    redirect: '/alarm/group',
    children: [
      {
        path: 'group',
        component: (resolve) => require(['@/views/alarm/group/index'], resolve),
      }
    ]
  },
  {
    path: '/led',
    component: Led,
    // component:(resolve)=>require(['@/views/led/index']),
    hidden: true,
    redirect: '/led/group',
    children: [
      {
        path: 'group',
        component: (resolve) => require(['@/views/led/group/index'], resolve),
      },
    ]
  },
  {
    path: '/broadcast',
    component: Broadcast,
    hidden: true,
    redirect: '/broadcast/group',
    children: [
      {
        path: 'group',
        component: (resolve) => require(['@/views/broadcast/group/index'], resolve),
      },
    ]
  },
  {
    path: '/atmosphere',
    redirect: '/atmosphere/home',
    component: (resolve) => require(['@/views/atmosphere/index'], resolve),
    hidden: true,
    children: [
      {
        path: 'home',
        name: 'home',
        component: (resolve) => require(['@/views/atmosphere/home/index'], resolve),
      },
    ]
  },
  {
    path: '/light',
    redirect: '/light/home',
    component: (resolve) => require(['@/views/light/index'], resolve),
    hidden: true,
    children: [
      {
        path: 'home',
        name: 'lightHome',
        component: (resolve) => require(['@/views/light/home/index'], resolve),
      }
    ]
  },
  {
    path: '/pole',
    component: (resolve) => require(['@/views/pole/index'], resolve),
    hidden: true
  },
  {
    path: '/yw',
    hidden: true,
    component: Yw
  },
  {
    path: '/dept',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'deptDraw/:deptId/:deptName',
        component: (resolve) => require(['@/views/system/dept/draw'], resolve),
        name: 'DeptDraw',
        meta: {title: '区域描绘'}
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
