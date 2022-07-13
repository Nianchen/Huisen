import store from "@/store";

/**
 * @project ruoyi-ui
 * @fileName socketStore.js
 * @author JiangHongxu
 * @date 2021/4/21 13:34
 */
function Socket(params) {
  this.ws = null
  this.url = ''
  //连接状态
  this.params = params
  this.isReconnect = false
  // 重连计时器
  this.reconnect_timer = null
  // 超时延迟器
  this.timeoutTimer = null
  //是否自动重连
  this.reconnect = true
  //重连间隔时间
  this.reconnectStep = 10000
  //重连次数
  this.reconnectTimes = 10
  this.handleInit = () => {
    //取出所有参数
    let params = this.params
    //设置连接路径
    let {url, port} = params
    let global_params = ['heartBeat', 'heartMsg', 'reconnect', 'reconnectStep', 'reconnectTimes']
    //定义全局变量
    Object.keys(params).forEach(key => {
      if (global_params.indexOf(key) !== -1) {
        this[key] = params[key]
      }
    })
    let ws_url = port ? url + ':' + port : url
    this.url = ws_url
    this.createWs(ws_url)
  }
  this.createWs = (ws_url) => {
    let that = this
    try {
      if (typeof WebSocket === 'undefined') {
        alert('此浏览器暂不支持WebSocket，请尝试用其他浏览器')
        return
      }
      this.ws = new WebSocket(ws_url)
      this.ws.onopen = this.handleOpen
      this.ws.onclose = this.handleClose
      this.ws.onerror = this.handleError
      this.ws.onmessage = this.handleMessage
      if (window.addEventListener) {
        window.addEventListener('beforeunload', function () {
          that.ws.close()
        })
      } else if (window.attachEvent) {
        // 主要是为了兼容老的IE
        window.attachEvent('onbeforeunload', function () {
          that.ws.close()
        })
      } else if ("onpagehide" in window) {
        window.addEventListener('pagehide', function () {
          that.ws.close()
        }, false);
      } else {
        window.onbeforeunload = function () {
          that.ws.close()
        }
      }
    } catch (e) {

    }
  }
  this.handleOpen = (data) => {
    console.log('WebSocket 连接成功--------无回调', data)
    store.dispatch('GetSocketStatus', true)
    this.reconnectTimes = 10
  }

  this.handleClose = (data) => {
    console.log('WebSocket 连接已经断开', data)
    if (this.reconnectTimes > 0) {
      this.reconnect_timer = setTimeout(() => {
        this.createWs(this.url)
        console.log(`重连第${10 - this.reconnectTimes}次`)
      }, this.reconnectStep)
      this.reconnectTimes--
    }
    store.dispatch('GetSocketStatus', false)
  }

  this.handleError = (err) => {
    console.log('WebSocket 连接出错', err)
  }

  this.handleMessage = (data) => {
    store.dispatch('GetMessage', data.data)
  }

  this.handleSendData = (data) => {
    if (this.ws.readyState === 1) {
      this.ws.send(data)
    }
  }
// // 心跳事件
//   this.handleHeartCheck = () => {
//     if (this.alive) {
//       this.heart_timer && clearInterval(this.heart_timer)
//       this.timeoutTimer && clearTimeout(this.timeoutTimer)
//       this.heart_timer = setInterval(() => {
//         if (!this.alive) {
//           this.heart_timer && clearInterval(this.heart_timer)
//           return
//         }
//         console.log('发送心跳事件')
//         this.handleSendData(this.heartMsg)
//       }, this.heartBeat)
//     }
//   }
//   this.handleReconnect = (ws_url) => {
//     /* 重连间隔计时器 */
//     this.reconnectTimes = 10
//     if (this.isReconnect) {
//       return
//     }
//     this.isReconnect = true
//     this.reconnect_timer = setInterval(() => {
//       //限制重连次数
//       if (this.reconnectTimes <= 0) {
//         //关闭定时器
//         clearInterval(this.reconnect_timer)
//         //跳出函数之间的循环
//         return;
//       } else {
//         //重连一次-1
//         this.reconnectTimes--
//       }
//       //进入初始状态
//       this.createWs(ws_url)
//     }, this.reconnectStep)
//   }
}

export default Socket
