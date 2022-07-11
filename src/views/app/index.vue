<template>
  <div class="app-camera">
    <!--    <web-rtc-player video-id="appVideo" :video-obj="videoObj"></web-rtc-player>-->
    <WebRTCPlayer_v2 class="app-camera-player" video-id="appVideo" :video-obj="videoObj"></WebRTCPlayer_v2>
    <div class="camera-body">
      <div class="camera-operator">
        <div class="operator-round"
             id="operator-round"
             @touchstart="handleTouchstart"
             @touchmove="handleTouchmove"
             @touchend="handleTouchend"></div>
        <div class="camera-operator-box">
          <div class="moveUp" id="moveUp" @touchstart="handleTouchstart('moveUp')"
               @touchend="handleOperatorTouchend"><span></span></div>
          <div class="moveRight" id="moveRight" @touchstart="handleTouchstart('moveRight')"><span></span></div>
          <div class="moveLeft" id="moveLeft" @touchstart="handleTouchstart('moveLeft')"><span></span></div>
          <div class="moveDown" id="moveDown" @touchstart="handleTouchstart('moveDown')"><span></span></div>
        </div>
      </div>
      <div class="camera-operator-other">
        <div class="camera-operator-other-step">
          <div>步长</div>
          <el-slider v-model="operateData.Iparam2" :min="1" :max="8"></el-slider>
        </div>
        <div class="zoom-focus">
          <div>
            <i class="iconfont icon-fangda1" @touchstart="handleTouchstart('addZoom')"></i>
            <i class="iconfont icon-suoxiao1" @touchstart="handleTouchstart('decZoom')"></i>
          </div>
          <div>
            <i class="iconfont icon-fangda" @touchstart="handleTouchstart('addFocus')"></i>
            <i class="iconfont icon-suoxiao3" @touchstart="handleTouchstart('decFocus')"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="camera-info">
<!--      <span>设备详情</span>-->
      <div><span>摄像头名称</span><span>{{ videoObj.name }}</span></div>
      <div><span>设备状态</span><span>{{ videoObj.status }}</span></div>
      <div><span>ip</span><span>{{ videoObj.ip }}</span></div>
      <div><span>用户名</span><span>{{ videoObj.username }}</span></div>
      <div><span>密码</span><span>{{ videoObj.password }}</span></div>
      <div><span>端口号</span><span>{{ videoObj.port }}</span></div>
      <div><span>通道号</span><span>{{ videoObj.channel }}</span></div>
    </div>
  </div>
</template>

<script>
import WebRtcPlayer from "@/views/camera/components/WebRtcPlayer";
import WebRTCPlayer_v2 from "@/views/camera/components/WebRTCPlayer_v2";
import {setToken} from '@/utils/auth'
import {getComponent} from '@/api/camera/component'

export default {
  name: "index",
  components: {WebRtcPlayer, WebRTCPlayer_v2},
  data() {
    return {
      ws: null,
      videoData: {
        uuid: '287efed6-adbf-4768-b50a-292d190a4ed6',
      },
      uuid: '',
      leftLooks: 55,
      topLooks: 55,
      StartX: 55,
      StartY: 55,
      radius: 70,
      operateFlag: '',
      operatorRound: null,
      videoHeight: 0,
      videoObj: {
        Username: '',
        password: '',
        channel: 0,
        ip: '',
        port: 37777,
        uuid: ''
      },
      operateData: {
        operate: '',
        nChannelID: 0,
        Iparam2: 5
      }
    }
  },
  created() {
    this.videoObj = {...this.$route.params}
    setToken(this.videoObj.token)
    this.getCameraInfo()
  },
  mounted() {
    this.operatorRound = document.getElementById('operator-round')
    this.videoHeight = document.getElementById('appVideo').offsetHeight
    this.initWs()
  },
  methods: {
    getCameraInfo() {
      console.log(this.videoObj.token)
      getComponent(this.videoObj.id).then(res => {
        console.log(res)
        this.videoObj = {...res.data}
      })
    },
    initWs() {
      if (window.WebSocket) {
        this.ws = new WebSocket('ws://192.168.3.77:8001/ptzControl')
        this.ws.onopen = this.handleWsOnOpen
        this.ws.onmessage = this.handleWsOnmessage
        this.ws.onclose = this.handleWsOnClose
      } else {
        this.$message.error('你的浏览器不支持WebSocket，请更换其他浏览器！')
      }
    },
    handleWsOnOpen() {
      const {username, password, channel, ip} = this.videoObj
      let opoperateLogin = this.operateData
      opoperateLogin.info = {
        Username: username,
        password,
        channel,
        ip,
        port: 37777
      }
      this.ws.send(JSON.stringify(opoperateLogin))
    },
    handleWsOnmessage(res) {
      console.log('handleWsOnmessage', res)
    },
    /**
     * 云台控制的websocket发送消息的函数
     */
    handleSend(data) {
      if (data.info) {
        delete data.info
      }
      this.ws.send(JSON.stringify(data))
    },
    handleTouchstart(operator) {
      console.log('触摸开始', operator);
      this.operateData.operate = operator
      if (operator.indexOf('move') !== -1) {

        let oOperator = document.getElementById(operator)
        oOperator.classList.add('camera-operator-box-view-hover')
        setTimeout(() => {
          oOperator.classList.remove('camera-operator-box-view-hover')
        }, 100)
      }
      this.handleSend(this.operateData)
    },
    handleTouchmove(event) {
      // console.log('触摸移动', event);
      // const {videoHeight, _80Height} = this.data
      let touchX = event.touches[0].pageX - 40;
      let touchY = event.touches[0].pageY - this.videoHeight - 40;
      // console.log(touchX,touchY)
      let movePos = this.getPosition(touchX, touchY);

      this.operatorRound.style.top = movePos.posY + 'px'
      this.operatorRound.style.left = movePos.posX + 'px'
      // this.setData({
      //   leftLooks: movePos.posX,
      //   topLooks: movePos.posY,
      // })

    },
    handleOperatorTouchend(event) {
      console.log(event)
    },
    handleTouchend(event) {
      console.log('触摸结束', event);
      this.operatorRound.style.top = 55 + 'px'
      this.operatorRound.style.left = 55 + 'px'
      this.operateData.operate = 'moveStop'
      this.handleSend(this.operateData)

    },
    getPosition(touchX, touchY) {
      const {StartX, StartY, radius} = this
      let DValue_X;
      let Dvalue_Y;
      let Dvalue_Z;
      let imageX;
      let imageY;
      let ratio;
      DValue_X = touchX - StartX;
      Dvalue_Y = touchY - StartY;
      Dvalue_Z = Math.sqrt(DValue_X * DValue_X + Dvalue_Y * Dvalue_Y);
      this.getOperate(DValue_X, Dvalue_Y)
      if (Dvalue_Z <= radius) {
        imageX = touchX;
        imageY = touchY;
        imageX = Math.round(imageX);
        imageY = Math.round(imageY);
        return {posX: imageX, posY: imageY};
      } else {
        ratio = radius / Dvalue_Z;
        imageX = DValue_X * ratio + StartX;
        imageY = Dvalue_Y * ratio + StartY;
        imageX = Math.round(imageX);
        imageY = Math.round(imageY);
        return {posX: imageX, posY: imageY};
      }
    },
    getOperate(x, y) {
      let roundOperate = ''
      let alwaysOperate = ''
      if (x > 0 && Math.abs(y) < x) {
        roundOperate = 'moveRight'
        alwaysOperate = 'alwaysRight'
      } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
        roundOperate = 'moveUp'
        alwaysOperate = 'alwaysUp'
      } else if (x < 0 && Math.abs(y) < Math.abs(x)) {
        roundOperate = 'moveLeft'
        alwaysOperate = 'alwaysLeft'
      } else if (y > 0 && y > Math.abs(x)) {
        roundOperate = 'moveDown'
        alwaysOperate = 'alwaysDown'
      }
      if (this.operateData.operate !== alwaysOperate) {
        this.operateData.operate = alwaysOperate
        this.handleSend(this.operateData)
        console.log(alwaysOperate)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.app-camera {
  background: url(../../assets/images/camera/page_bg.jpg) no-repeat center center fixed;

  background-size: 100% 100vh;
  color: white;
}
.app-camera-player{
  width: 100%;
}
.camera-info {
  width: 100%;
  font-size: 15px;
  div {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 35px;
  }

}


.camera-body {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*background-color: #adaeaf;*/
}

.camera-operator {
  margin-left: 10px;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  /*overflow: hidden;*/
  /*border: 1px solid #a3a3a3;*/
  font-size: 0;
  background: #f6f6f6;
  background-size: 100% 100%;
}

.camera-operator .operator-round {
  position: absolute;
  top: 55px;
  left: 55px;
  /*transform: translate(-50%, -50%);*/
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  background: rgba(242, 162, 49, 0.8);
  z-index: 1000;
  box-shadow: 0 0 2px 3px #f2a231;
}

.camera-operator-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.camera-operator-box > div {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 75px;
  height: 75px;
  border-radius: 75px 0 0 0;
  overflow: hidden;
  /*transform: skew(45deg);*/
  transform-origin: 75px 75px;
  background-color: #f6f6f6;
  /*background-color: rgba(234, 238, 238, 0.9);*/
  /*border: 1px solid rgba(54, 53, 53, 0.3);*/
  z-index: 100000;
}

.camera-operator-box > div:nth-child(2) {
  transform: rotate(90deg);
}

.camera-operator-box > div:nth-child(3) {
  transform: rotate(-90deg);
}

.camera-operator-box > div:nth-child(4) {
  transform: rotate(-180deg);
}

.camera-operator-box > div > span {
  position: absolute;
  top: 30%;
  left: 30%;
  transform: rotate(-45deg);
  display: block;
  width: 0;
  height: 0;
  border: 8px solid;
  border-color: transparent transparent rgba(190, 190, 190, 0.8);
}

.camera-operator-box-view-hover {
  background: linear-gradient(-45deg, rgba(242, 162, 49, 0), rgba(242, 162, 49, .4), rgba(242, 162, 49, .7), rgba(242, 162, 49, 0.9));
}

.camera-operator-box-view-hover > span {
  width: 0;
  height: 0;
  border: 8px solid;
  border-color: transparent transparent rgba(255, 255, 255, 0.8);
}

.camera-operator-other {
  box-sizing: border-box;
  width: 58%;
  height: 55%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.camera-operator-other-step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
}

.camera-operator-other-step .el-slider {
  width: 75%;
}

.camera-operator-other .zoom-focus {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.camera-operator-other .zoom-focus > div {
  height: 120%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.camera-operator-other .zoom-focus i {
  width: 25px;
  height: 25px;
  font-size: 20px;
}

.icon-suoxiao3 {
  font-weight: 600;
}

</style>
